// 添加发布者 -- 作用是根据数据变化进行视图更新 --添加
class Dep {
    constructor() {
        this.list = [];
        this.target = null;
    }

    addSub(vm) {
        this.list.push(vm);
    }

    notify() {
        this.list.forEach(item => {
            item.updata()
        })
    }
}