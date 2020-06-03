class Mvvm {
    constructor(options) {
        this.el = options.el;
        this.data = options.data;

        /* 采坑点 -- get-set的value问题 --使用闭包
         * 
         *
        */

        // 模板编译
        if (options.el) {
            // 添加get set -- 需要添加dep -- watcher
            new Observer(this.data)
            // 获取dom操作
            new Complit(this.el, this)
        }
    }
}