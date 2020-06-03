function getStorage(key) {
	key = key || '';
	if (key == '') {
		return ''
	}
	var t = wx.getStorageSync(key)
	return t
}

function setStorage(obj) {
	obj.key = obj.key || '';

	wx.setStorage({
		key: obj.key,
		data: obj.data || {},
		success(res) {
			obj.success && obj.success(res)
		},
		fail(res) {
			obj.fail && obj.fail(res)
		},
		complete(res) {
			obj.complete && obj.complete(res)
		}
	})
}

function removeStorage(obj) {
	obj.key = obj.key || '';
	wx.removeStorage({
		key: obj.key,
		success(res) {
			obj.success && obj.success(res);
		},
		fail() {
			obj.fail && obj.fail(res)
		},
		complete(res) {
			obj.complete && obj.complete(res)
		}
	})
}

module.exports = {
	getStorage,
	setStorage,
	removeStorage
}
