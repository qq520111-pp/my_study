
//根据添加的发布者观察数据变化更新视图
class Watcher {
    constructor(vm, key, caller) {
        this.$vm = vm;
        this.exp = key;
        this.caller = caller;

        this.value = this.getValue(vm, key)
    }

    get(vm, exp) {
        let arr = exp.split('.');
        let value = arr.reduce((item, nextI) => {
            return item[nextI]
        }, vm.data);
        return value
    }

    getValue(vm, key) {
        Dep.target = this;

        let value = this.get(vm, key);

        Dep.target = null;

        return value
    }

    updata() {
        let newValue = this.$vm.data[this.exp];

        if (newValue == this.value) {
            return false
        }
        this.caller(newValue)
    }
}