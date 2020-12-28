import { VuexModule, Module, MutationAction } from 'vuex-module-decorators';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Account from '@/model/Account';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

interface AccountResponse {
    accounts: Account[];
}

@Module({ namespaced: true })
class AccountModule extends VuexModule {
    public accounts: Account[] = [];

    // @Mutation
    // async addExpense(expense: Expense) {
    //     this.expenses.unshift(expense);
    // }

    // @Action({ commit: 'addExpense' })
    // async createExpense(expense: Expense) {
    //     const result = await Vue.axios.post('/api/expense', expense);
    //     // TODO: Add Error handling
    //     return result.data;
    // }

    @MutationAction({ mutate: ['accounts'] })
    async loadAccounts(): Promise<AccountResponse> {
        const result = await Vue.axios.get('/api/account');
        return { accounts: result.data };
    }

    // @MutationAction({ mutate: ['accounts'] })
    // async loadAccounts() {
    //     await Promise.resolve();
    //     return { accounts: this.accounts };
    //     // const result = await Vue.axios.get('/api/account');
    //     // return { accounts: result.data };
    // }
}
export default AccountModule;
