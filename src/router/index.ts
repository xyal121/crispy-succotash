import uniCrazyRouter from "uni-crazy-router";
import {bindInterceptLogin} from './interceptLogin'
import Auth from "@/common/auth";

export function setupRouter(app: any) {
    // 接收vue3的实例，并注册uni-crazy-router
    app.use(uniCrazyRouter)
}

// 启用登录页的拦截
bindInterceptLogin()

uniCrazyRouter.beforeEach(async (to, from, next) => {
    // 逻辑代码
    console.log('to', to)
    console.log(!Auth.getAuthorization())
    if (!Auth.getAuthorization() && to.url !== 'pages/login/login') {
        uniCrazyRouter.afterNotNext(() => {
            // 拦截路由，并且跳转去登录页
            uni.navigateTo({
                url: '/pages/login/login'
            })
        })
        return // 拦截路由，不执行next
    }
    next()
})

uniCrazyRouter.afterEach((to, from) => {
    // 逻辑代码
})

uniCrazyRouter.onError((to, from) => {
    // 逻辑代码
})