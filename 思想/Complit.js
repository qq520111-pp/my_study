class Complit {
    constructor(el, vm) {
        this.el = el;
        this.vm = vm;

        this.el = this.isNode(this.el) ? el : document.querySelector(this.el);

        // 获取目标元素的子元素
        let dom = this.toElement(this.el);

        // dom的操作
        this.viewInit(dom)

        //添加回去
        this.el.appendChild(dom);

    }

    isNode(node) {
        // 1 是节点
        return node.nodeType == 1
    }

    toElement(ele) {
        let frag = document.createDocumentFragment();
        let first
        while (first = ele.firstChild) {
            frag.appendChild(first);
        }
        return frag
    }

    viewInit(frag) {
        let fragChild = frag.childNodes;
        let self = this;
        fragChild.forEach((item, index) => {
            if (self.isNode(item)) {
                // 节点处理v-
                self.compileAtt(item);
                //递归
                self.viewInit(item);
            } else {
                // 文本处理{{}}
                self.compileText(item);
            }
        });

    }

    compileText(node) {
        let exp = node.textContent;
        let reg = /\{\{([^}+])\}\}/g;//正则有问题--只能匹配单字符
        if (reg.test(exp)) {
            CompileUtil["text"](node, this.vm, exp);
        }
    }

    compileAtt(node) {
        let attrs = node.attributes;
        let self = this;
        [].forEach.call(attrs, (item => {
            if (item.name.startsWith("v-model")) {
                CompileUtil["model"](node, self.vm, item.value);
            }
        }))
    }
}

CompileUtil = {
    text: function (node, vm, exp) {
        let result = this.getText(vm.data, exp);

        exp.replace(/\{\{([^}+])\}\}/g, function (v1, v2) {
            // 第一次执行get

            new Watcher(vm, v2, function (value) {
                CompileUtil.updateNode['text'](node, CompileUtil.getText(vm.data, exp))
            })
        })


        this.updateNode['text'](node, result)

    },
    model: function (node, vm, exp) {
        let result = this.getAttr(vm.data, exp);
        this.updateNode['model'](node, result);

        new Watcher(vm, exp, function (value) {
            CompileUtil.updateNode['model'](node, CompileUtil.getAttr(vm.data, exp))
        })

        node.addEventListener("input", function (e) {

            let newValue = e.target.value;
            CompileUtil.setVal(vm, exp, newValue);
        })
    },
    getText(data, exp) {
        console.log(exp);
        let reg = /\{\{([^}+])\}\}/g;
        let result = exp.replace(reg, function (v1, v2) {
            console.log(v2);
            // 第一次执行get
            return CompileUtil.get(data, v2)
        })
        return result
    },
    setVal(vm, expr, value) { //expr => [info,a]
        // 招到对应的值设置即可
        expr = expr.split('.');
        return expr.reduce((pre, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return pre[next] = value;
            }
            return pre[next];
        }, vm.data);
    },
    getAttr(data, exp) {
        // 第一次执行get
        return CompileUtil.get(data, exp)
    },
    updateNode: {
        text(node, text) {
            node.textContent = text;
        },
        model(node, exp) {
            node.value = exp
        }
    },
    get(data, exp) {
        let arr = exp.split('.');
        let value = arr.reduce((item, nextI) => {
            return item[nextI]
        }, data);
        return value
    }
}