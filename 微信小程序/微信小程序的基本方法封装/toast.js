let toast = {
	success(obj) {
		wx.showToast({
			title: obj.title || '成功',
			icon: 'success',
			duration: obj.time || 2000
		})
	},
	loading(obj) {
		wx.showToast({
			title: obj.title || "加载中",
			icon: 'loading',
			duration: obj.time || 2000
		})
	},
	showLoading(obj) {
		wx.showLoading({
			title: obj.title
		})
	},
	hideLoading() {
		wx.hideLoading();
	},
	showModal(obj) {
		wx.showModal({
			title: obj.title || "提示",
			content: obj.content || "",
			showCancel: obj.showCancel || true,
			success(res) {
				if (obj.success) obj.success(res)
			},
			fail(res) {
				if (obj.fail) obj.fail(res)
			}
		})
	}


}

module.exports = toast
