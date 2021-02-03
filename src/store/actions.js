import { requestLogin, requestAddress, requestSwiperShops, requestBusinessList, requestGetShopInfo, requestGetShopNav } from '../api/index'
import { GET_ADDRESS, GET_SWIPERSHOPS, GET_BUSINESSLIST, GET_SHOPIFO, GET_SHOPNAV } from './mutations_types'
export default {
    // 账号密码登录
    async accountLogin({ state }) {
        const res = await requestLogin(state)
        console.log(res);
    },
    // 请求地址
    async getAddress({ commit, state }) {
        const res = await requestAddress(state.latitude, state.longitude)
        res.data.code === 0 && commit(GET_ADDRESS, res.data.data.address)
    },
    // 请求导航商品选项
    async getSwiperShops({ commit }) {
        const res = await requestSwiperShops()
        res.data.code === 0 && commit(GET_SWIPERSHOPS, res.data.data)
    },
    // 商家列表
    async getBusinessList({ commit, state }) {
        const res = await requestBusinessList(state.latitude, state.longitude)
        res.data.code === 0 && commit(GET_BUSINESSLIST, res.data.data)
    },
    // 商家信息
    async getShopInfo({ commit }) {
        const res = await requestGetShopInfo()
        console.log(res);
        res.data.code === 0 && commit(GET_SHOPIFO, res.data.data)
    },
    // 商家商品
    async getShopNav({ commit }, scrollCallback) {
        const res = await requestGetShopNav()
        console.log(res);
        if (res.data.code === 0) {
            commit(GET_SHOPNAV, res.data.data)
            scrollCallback && scrollCallback()
        }
    }
}