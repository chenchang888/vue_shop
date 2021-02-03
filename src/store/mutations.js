import { GET_ADDRESS, GET_SWIPERSHOPS, GET_BUSINESSLIST, GET_SHOPIFO, GET_SHOPNAV } from './mutations_types'
export default {
    // USE_LOGIN
    useLogin(state, name) {
        state.name = name
    },
    use_pwd(state, pwd) {
        state.pwd = pwd
    },
    use_verification(state, captcha) {
        state.captcha = captcha
    },
    // address
    [GET_ADDRESS](state, address) {
        state.address = address
    },
    // swiper
    [GET_SWIPERSHOPS](state, swiperShops) {
        state.swiperShops = swiperShops
    },
    // businessList
    [GET_BUSINESSLIST](state, businessList) {
        state.businessList = businessList
    },
    // 商家信息
    [GET_SHOPIFO](state, shopInfo) {
        state.shopInfo = shopInfo
    },
    // 商家商品
    [GET_SHOPNAV](state, shopNav) {
        state.shopNav = shopNav
        console.log(6);
        console.log(state.shopNav);
    }
}