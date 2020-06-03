//基本请求

function request(obj) {
	obj = obj || {};
	obj.data = obj.data || {};
	var token = this.my_const.access_token || '';
	if (token) {
		obj.data.access_token = token;
	}
	wx.request({
		url: obj.url,
		data: obj.data,
		method: obj.method || 'GET',
		header: obj.header || {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		success(res) {
			obj.success && obj.success(res)
		},
		fail(res) {
			obj.fail && obj.fail(res)
		},
		complete: function(res) {
			if (200 != res.statusCode && res.data && res.data.code && 500 == res.data.code) {
				var message = res.data.data.message;
				wx.showModal({
					title: "系统错误",
					content: message + ";\r\n请将错误内容复制发送给我们，以便进行问题追踪。",
					cancelText: "关闭",
					confirmText: "复制",
					success: function(e) {
						e.confirm && o.setClipboardData({
							data: JSON.stringify({
								data: t.data.data,
								object: a
							})
						})
					}
				})
			}
			obj.complete && obj.complete(res)
		}
	})
}

module.exports = {
	request
}
