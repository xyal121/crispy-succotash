import request from "@/common/request"

export default {

	/**
	 * 是否有认证信息
	 */
	isAuthorization: function() {
		let authorizationStr = "";
		try {
			authorizationStr = uni.getStorageSync('authorization');
		} catch (e) {
			console.log(e);
		}

		if (authorizationStr && authorizationStr != undefined && authorizationStr != '') {
			return true;
		}
		return false;
	},

	/**
	 * 同步获取用户认证信息
	 */
	getAuthorization: function() {
		let authorizationStr = "";
		try {
			authorizationStr = uni.getStorageSync('authorization');
		} catch (e) {
			console.log(e);
		}
		return authorizationStr;
	},

	/**
	 * 设置用户token串
	 */
	setAuthorization: function(authorizationStr:string) {
		uni.setStorageSync('authorization', authorizationStr);
	},

	/**
	 * 设置用户信息
	 */
	setUserInfo: function(userinfo:any) {
		uni.setStorageSync('userinfo', userinfo);
	},

	/**
	 * 获取用户信息
	 */
	getUserInfo: async function() {
		let userinfo = "";
		try {
			userinfo = await uni.getStorageSync('userinfo');
		} catch (e) {
			console.log(e);
		}

		// 如果本地存储
		if (userinfo && userinfo != undefined && userinfo != '') {
			return await uni.getStorageSync('userinfo');
		} else {
			return await this.refreshUserInfo();
		}
	},


	/**
	 *刷新最新用户信息
	 */
	refreshUserInfo: async function() {
		const res:any = await request.get("/api/app/userinfo", null)
		this.setAuthorization(res.data.access)
        this.setUserInfo(res.data.user_info);
		return uni.getStorageSync('userinfo');
	},
}
