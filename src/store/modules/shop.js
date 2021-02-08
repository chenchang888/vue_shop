import Vue from 'vue'
import { requestShopData } from '../../api/index'
import { GET_SHOPDATA, ADD_COLLECTNUM, DEL_COLLECTNUM, DEL_ALLSHOPFOOD, SAVE_CARTLOCATION, SAVE_CARTSHOP } from '../mutations_types'
const shopModules = {
    state: {
        // 商家商品
        shopData: {},
        // 购物车
        cartShop: []
    },
    mutations: {
        [GET_SHOPDATA](state, shopData) {
            state.shopData = shopData
        },
        [ADD_COLLECTNUM](state, foodShop) {
            if (!foodShop.count) {
                Vue.set(foodShop, 'count', 1)
                state.cartShop.push(foodShop)
            } else {
                foodShop.count++
            }
        },
        [DEL_COLLECTNUM](state, foodShop) {
            if (foodShop.count <= 1) {
                console.log(666);
                state.cartShop.splice(state.cartShop.indexOf(foodShop), 1)
                foodShop.count = 0
            } else {
                foodShop.count--
            }
        },
        [SAVE_CARTSHOP](state, cartShop) {
            state.cartShop = cartShop
        },
        // 清空购物车
        [DEL_ALLSHOPFOOD](state) {
            state.cartShop.forEach(item => {
                item.count = 0
            });
            state.cartShop = []
        },
        // 缓存中的数据存入
        [SAVE_CARTLOCATION](state, shopData) {
            state.shopData = shopData
        }
    },
    actions: {
        async getShopData({ commit }, getShopData) {
            const res = await requestShopData()
            if (res.data.code === 0) {
                commit(GET_SHOPDATA, res.data.data)
                console.log(9);
                getShopData && getShopData()
            }
        },
        // 加入购物车的商品数量
        getCollectNum({ commit }, { flag, foodShop }) {
            console.log(this.state);
            if (flag) {
                commit(ADD_COLLECTNUM, foodShop)
            } else {
                commit(DEL_COLLECTNUM, foodShop)
            }
        }
    },
    getters: {
        getAllCartNum: state => state.cartShop.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0),
        getAllCartCost: state => state.cartShop.reduce((accumulator, currentValue) => accumulator + currentValue.count * currentValue.price, 0),
    }
}
export default shopModules