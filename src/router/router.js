import app from '@/views/app/app'
import { lazyViews, lazyComponents } from '@/utils/lazyVue'


export default {
    routes: [{
        path: '/',
        name: 'HOMES',
        component: app,
        children: [{
                path: '/home',
                name: 'home',
                component: lazyViews('home/home'), //首页
                meta: { auth: false }
            }, {
                path: '/shopcars',
                name: 'shopcars',
                component: lazyViews('shopcars/shopcars'), //采购车
                meta: { auth: true }
            }, {
                path: '/entry',
                name: 'entry',
                component: lazyViews('entry/entry'), //入驻
                meta: { auth: true }
            },
            {
                path: '/mes',
                name: 'mes',
                component: lazyViews('mes/mes'), //消息管理
                meta: { auth: false }
            },
            {
                path: '/mime',
                name: 'mime',
                component: lazyViews('mime/mime'), //我的
                meta: { auth: true }
            },
            {
                path: '/',
                redirect: '/home' //重定向,打开页面就在goods
            }
        ]
    }, {
        path: '/entrance',
        name: 'entrance',
        component: lazyViews('entrance'), //注册登录入口
        meta: { auth: false },
        children: [{
            path: '/reg',
            name: 'reg',
            component: lazyComponents('Reg'), //注册
            meta: { auth: false }
        }, {
            path: '/login',
            name: 'login',
            component: lazyComponents('Login'), //登录
            meta: { auth: false }
        }, {
            path: '/entrance',
            redirect: '/login' //重定向,打开页面就在goods
        }]
    }, {
        path: '/forget',
        name: 'forget',
        component: lazyComponents('forget'), //忘记密码
        meta: { auth: false }
    }]
}



// import home from '@/views/home/home' //首页
// import shopcars from '@/views/shopcars/shopcars' //采购车
// import entry from '@/views/entry/entry' //入驻
// import mes from '@/views/mes/mes' //消息
// import mime from '@/views/mime/mime' //我的

//import entrance from '@/views/entrance' //登录,注册入口
//import reg from '@/components/Reg' //注册
//import login from '@/components/Login' //登录