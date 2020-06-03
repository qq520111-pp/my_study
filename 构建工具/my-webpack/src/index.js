import Vue from "vue";
import APP from "./APP"
import VueRouter from "vue-router";

const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

Vue.use(VueRouter);

var router = new VueRouter({
    routes: [{
        name: "Foo",
        path: '/foo',
        component: Foo
    }]
})

var vm = new Vue({
    el: "#app",
    router,
    render(createEle) { return createEle(APP) }
})