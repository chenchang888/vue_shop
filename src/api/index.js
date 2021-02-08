import $http from './ajax.js'

// 账号密码登录
const requestLogin = ({ name, pwd, captcha }) => {
    console.log(name, pwd, captcha);
    return $http('/login_pwd', {
        method: 'POST',
        data: {
            name,
            pwd,
            captcha
        }
    })
}
// 请求当前地址
const requestAddress = (latitude, longitude) => $http(`/position/${latitude},${longitude}`)
// 请求导航商品选项
const requestSwiperShops = () => $http('/index_category')
// 请求商家列表
const requestBusinessList = (latitude, longitude) => $http('/shops', {
    params: {
        latitude,
        longitude
    }
})
// 获取商家信息
const requestShopData = () => $http('/shopData')
// 获取商家信息
// const requestGetShopInfo = () => $http('/info')
// 获取商家信息
// const requestGetShopNav = () => $http('/goods')
export {
    requestLogin,
    requestAddress,
    requestSwiperShops,
    requestBusinessList,
    requestShopData,
    // requestGetShopInfo,
    // requestGetShopNav
}