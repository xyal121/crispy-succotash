import {beforeEach, afterNotNext} from "uni-crazy-router"
import Auth from "@/common/auth";
let intercept:any;
export async function bindInterceptLogin () {
    intercept = beforeEach(async (to, from ,next) => {
        if (to.url === 'pages/login/login') {
            if (Auth.getAuthorization()) {
                afterNotNext(() => {
                    uni.navigateTo({
                        url: '/pages/tab-home/tab-home',
                    })
                })
            } else {
                next()
            }
        }
        next()
    })
}
export function destroyInterceptLogin () {
    if (intercept) {
        intercept() // 销毁拦截
        intercept = null
    }
}