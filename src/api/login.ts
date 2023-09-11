import request from '@/common/request'
import Auth from "@/common/auth";
import settings from '@/common/settings'

// 登录接口
export function login(data?: any) {
    return request.get('/system/api/wechat_oauth2/' + settings.custom.appid + '/', null).then(res => {
        console.log('login_info', res)
        Auth.setAuthorization(res.data.access)
        Auth.setUserInfo(res.data.user_info)
        return res
    })
}