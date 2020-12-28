import Vue from 'vue';
import Vuex from 'vuex';
import account from '@/store/modules/account';
import expense from '@/store/modules/expense';

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
        account,
        expense,
    },
});
