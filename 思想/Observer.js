class Observer {
    /**
     * 第一步给数据递归绑定get和set
     * 
     * 
     * 
     * 
     * */
    constructor(data) {
        this.$data = data;
        //添加get,set
        this.definedP(data);
    }

    definedP(data) {
        if ((typeof data) != "object") {
            return false
        }

        for (const key in data) {
            this.addDefinedP(data, key, data[key]);
            this.definedP(data[key]);
        }
    }
    addDefinedP(obj, key, value) {
        let self = this;
        var dep = new Dep();
        
        Object.defineProperty(obj, key, {
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(v) {
                // 闭包--下次访问的时候更改值

                // 值是object的时候深度监听;

                if (v == value) { return };
                value = v;
                // debugger;
                dep.notify();
                self.definedP(v);
            }
        })
    }
}