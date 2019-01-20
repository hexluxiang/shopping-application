import fetch from "@/apis/fetch";
const _public = 'User';
const _method_P = 'POST';

export default {
    userLogin(data) { //登录
        return fetch({
            url: `${_public}/login`,
            data,
            isSilence: false,
            method: _method_P
        })
    },
    userReg(data) { //注册
        return fetch({
            url: `${_public}/regist`,
            data,
            isSilence: false,
            method: _method_P
        })
    },
    userSms(data) { //发送验证码
        return fetch({
            url: `${_public}/sendVcode`,
            data,
            isSilence: false,
            method: _method_P
        })
    },
    userForget(data) { //忘记密码
        return fetch({
            url: `${_public}/forget`,
            data,
            isSilence: false,
            method: _method_P
        })
    },
    userInfo() { //用户信息
        return fetch({
            url: `${_public}/me`,
            method: _method_P
        })
    },
    userExit() { //用户退出
        return fetch({
            url: `${_public}/logout`,
            method: _method_P
        })
    },
    setUserInfo(data) { //修改用户信息
        return fetch({
            url: `${_public}/update`,
            method: _method_P,
            data
        })
    },
    getHomeInfo(data) { //获取首页内容
        return fetch({
            url: 'System/home',
            method: _method_P,
            data
        })
    },
    getShopDetail(data) {
        return fetch({
            url: 'Goods/getDetail',
            method: _method_P,
            data
        })
    },
    getGoodsNum(data) { //拿到库存
        return fetch({
            url: 'Goods/getLogs',
            method: _method_P,
            data
        })
    },
    saveShop(data) { //收藏店铺
        return fetch({
            url: 'Shop/watch',
            method: _method_P,
            data
        })
    },
    cancleShop(data) { //取消收藏
        return fetch({
            url: 'Shop/unwatch',
            method: _method_P,
            data
        })
    },
    saveGoods(data) { //收藏商品
        return fetch({
            url: 'Goods/watch',
            method: _method_P,
            data
        })
    },
    cancleGoods(data) { //取消收藏商品
        return fetch({
            url: 'Goods/unwatch',
            method: _method_P,
            data
        })
    },
    getCarts(data) { //获取购物车
        return fetch({
            url: 'Goods/getCarts',
            method: _method_P,
            data
        })
    }
}