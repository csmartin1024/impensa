import {
    VuexModule,
    Module,
    MutationAction,
    Action,
    Mutation,
} from 'vuex-module-decorators';
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Expense from '@/model/Expense';

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// interface Identifier {}
// type Identifier = {};

// interface Category {

// }

// enum Category {
//     None,
// }

// interface Expense3 {
//     // id: Identifier;
//     accountId: number;
//     amount: number;
//     category: string;
//     merchant: string;
//     notes: string;
//     // created_at: moment
// }
// interface Expense4 {
//     id: number;
//     accountId: number;
//     amount: number;
//     category: string;
//     merchant: string;
//     notes: string;
//     // created_at: moment
// }

// Vue.axios.defaults.baseURL = 'http://localhost:8000/api';

@Module({ namespaced: true })
class ExpenseModule extends VuexModule {
    public expenses: Expense[] = [];

    @Mutation
    async addExpense(expense: Expense) {
        this.expenses.unshift(expense);
    }

    @Action({ commit: 'addExpense' })
    async createExpense(expense: Expense) {
        const result = await Vue.axios.post('/api/expense', expense);
        // TODO: Add Error handling
        return result.data;
    }

    // @MutationAction({ mutate: ['checked'] })
    // async updateExpense(todo: Todo) {
    //     // todo.checked = !todo.checked;
    //     const result = await Vue.axios.put(`/api/expense/${todo.id}`, todo);
    //     return result.data;
    //     // return { checked: newChecked };
    // }

    @MutationAction({ mutate: ['expenses'] })
    async loadExpenses() {
        const result = await Vue.axios.get('/api/expense');
        return { expenses: result.data };
    }
}
export default ExpenseModule;
