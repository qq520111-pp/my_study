const root = {
	acid: -1,
	version: "1.0.0",
	path: "https://tongren.sunluo521.com/index.php/",
};
let api = {
	index: root.path + 'index/index',
	openid: root.path + 'pay/getopenid',
	store_de: root.path + "Search/store_show",
	store_cat_goods: root.path + "Search/return_cat_goods",
	hot_search: root.path + "Search/hot_search", //热搜
	login: root.path + "login/login", //登录
	register: root.path + "login/register", //注册
	getopenidall: root.path + "pay/getopenidall", //获取手机号sess-openid
	getphone: root.path + "pay/getphone", //获取手机号
	searchList: root.path + "Search/searchList", //搜索结果
	storelist: root.path + "index/storelist", //附近药店
	fujinsheng: root.path + "index/fujinsheng", // 省份点击
	messageAll: root.path + "message/all", // 首页消息
	getcoupon: root.path + "index/getcoupon", //首页优惠券领取 
	changecart: root.path + "goods/changecart", //加入购物车
	catList: root.path + "Search/catList", //购物车列表
	collect: root.path + "index/collect", //收藏
	goodsAll: root.path + "goods/all", //商品详情
	dianzhanfen: root.path + "index/dianzhanfen", // 分类
	addOrder: root.path + "Search/addOrder", // 添加订单
	confirmOrder: root.path + "Search/confirmOrder", // 确认订单
	pay: root.path + "Pay/pay", //支付接口
	myOrderList: root.path + "Search/myOrderList", //订单列表
	cancelOrder: root.path + "Search/cancelOrder", //取消订单
	addressList: root.path + "Search/addressList", //地址
	get_area_info: root.path + "Search/get_area_info", //拿到省市区
	add_user_address: root.path + "Search/add_user_address", //地址创建
	doedit_user_address: root.path + "Search/doedit_user_address", //地址编辑
	delete_user_address: root.path + "Search/delete_user_address", // 地址删除
	set_default_address: root.path + "Search/set_default_address", // 设置默认地址
	delcartone: root.path + "index/delcartone", // 删除购物车
	cartcollect: root.path + "index/cartcollect", //购物车收藏
	reNewAddOrder: root.path + "Search/reNewAddOrder", //重新下单
}
module.exports = api
