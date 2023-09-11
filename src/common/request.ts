import settings from '@/common/settings'
import Auth from '@/common/auth'

enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export default {
    get: function (url: string, data: any): Promise<any> {
        return request(url, data, HttpMethod.GET);
    },

    post: function (url: string, data: any): Promise<any> {
        return request(url, data, HttpMethod.POST);
    },

    put: function (url: string, data: any,): Promise<any> {
        return request(url, data, HttpMethod.PUT);
    },

    delete: function (url: string, data: any): Promise<any> {
        return request(url, data, HttpMethod.DELETE);
    },
}

/**
 * http请求
 * @param {Object} url 请求地址
 * @param {Object} data 请求数据
 * @param {Object} callback 回调方法
 * @param {Object} method 请求方法类型
 */

function request(url: string, data: any, method: HttpMethod): Promise<any> {
    return new Promise((resolve, reject) => {
        // 如果是自定义地址，本项目以外的
        let requestURL = '';
        if (url != undefined && (url.indexOf('http://') == 0 || url.indexOf('https://') == 0)) {
            requestURL = url;
        } else if (url != undefined) {
            requestURL = settings.baseUrl + url;
        } else {
            reject(new Error('请求地址为空'));
            return;
        }
        const headers = {
            'Authorization': 'Bearer ' + Auth.getAuthorization(),
            'Content-Type': method === HttpMethod.POST || method === HttpMethod.PUT ? 'application/json' : 'application/x-www-form-urlencoded'
        };

        uni.request({
            url: requestURL,
            method: method,
            data: data,
            dataType: 'json',
            timeout: 60000,
            header: headers,
            success: res => {
                // 后台报错，没有返回指定格式数据
                if (typeof res === 'string') {
                    reject(new Error('返回数据格式有误'))
                } else if (res.statusCode === 200) {
                    resolve(res.data)
                } else {
                    reject(handleReturn(res, url, data, method));
                }

            },
            fail: (e) => {
                console.log('e', e)
                const errMsg = (e.errMsg || '').toLowerCase();
                if (errMsg === 'request:fail') {
                    reject(new Error('网络错误，请检查网络连接'))
                } else if (errMsg === 'request:fail abort') {
                    reject(new Error('请求超时，请重试'))
                } else {
                    reject(new Error(e.errMsg))
                }
            }
        });
    })
}

/**
 * 返回结果处理
 * @param {Object} returnData
 * @param {Object} callback
 */
async function handleReturn(res: any, url: string, data: any, method: HttpMethod) {
    if (res.statusCode === 401) {
        // 401 表示 token 过期，需要刷新 token
        try {
            const newToken = await Auth.refreshUserInfo()
            if (!newToken) {
                Auth.setAuthorization('');
                return Promise.reject(res.data.details)
            }
            Auth.setAuthorization(newToken);
            // 重定向到首页
            // uni.reLaunch({
            //     url: 'pages/tab-home/tab-home',
            //     success: () => {
            //     }
            // });
            return await request(url, data, method);
        } catch (error) {
            failAuthorization();
            throw error;
        }
    } else if (res.statusCode == 307) {
        if (res.data.redirect_url && typeof res.data.redirect_url === 'string') {
            location.href = res.data.redirect_url
        }
    }
    return Promise.reject(res)

}

/**
 * 认证失败处理
 */
function failAuthorization() {
    uni.reLaunch({
        url: 'pages/tab-home/tab-home',
        success: () => {
            uni.clearStorage();
        }
    });
}

/**
 * 错误提示框
 * @param {Object} message
 */
function showErrorModal(message: string) {
    uni.showModal({
        title: '提示',
        content: message,
        showCancel: false,
        success: function (res) {
        }
    });
}
