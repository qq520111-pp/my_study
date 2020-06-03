//调用封装函数的入口文件

var core = require('./request.js')
var storage = require('./storage.js')
var api = require('./api.js')
var my_toast = require('./toast.js')

function mountMethod(that) {

	// 基本变量
	that.prototype.my_const = {
		access_token: storage.getStorage('access_token')
	}

	// 基本方法
	that.prototype.my_toast = my_toast;
	that.prototype.my_methods = {
		downloadImg,
		timeHandle,
		getUser
	}

	//路径相关
	that.prototype.api = api;

	//缓存相关
	that.prototype.getStorage = storage.getStorage;
	that.prototype.setStorage = storage.setStorage;
	that.prototype.removeStorage = storage.removeStorage;

	//请求相关
	that.prototype.request = core.request;

}

function getUser() {
	var user = wx.getStorageSync("USER_INIF")
	return user ? user : false
}

//this.my_methods.downloadImg({url:}); 保存图片
function downloadImg(obj) {
	wx.downloadFile({
		url: obj.url || "",
		success(res) {
			wx.saveImageToPhotosAlbum({
				filePath: res.tempFilePath,
				success() {
					wx.showModal({
						title: '成功',
						icon: 'success',
						duration: time || 2000
					})
				},
				fail() {
					wx.showToast({
						title: '保存失败',
						duration: time || 2000
					})
				}
			})
		}
	})
}

//时间处理器 时间戳转换时间格式
function timeHandle(time) {
	var time = time * 1000;
	var date = new Date(time);

	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDay();

	if (month.toString().length == 1) {
		month = "0" + month
	}
	if (day.toString().length == 1) {
		day = "0" + day
	}

	return year + "." + month + "." + day
}

module.exports = {
	mountMethod
}
