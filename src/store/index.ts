import Vue from 'vue';
import Vuex from 'vuex';
import expense from '@/store/modules/expense';
import goop from '@/store/modules/goop';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        count: 0,
    },
    mutations: {
        increment(state) {
            state.count++;
        },
    },
    actions: {},
    modules: {
        expense,
        goop,
    },
});
