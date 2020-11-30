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

Vue.use(Vuex);
Vue.use(VueAxios, axios);

// interface Identifier {}
type Identifier = {};

// interface Category {

// }

enum Category {
    None,
}

interface Expense3 {
    // id: Identifier;
    accountId: Identifier;
    amount: number;
    category: Category;
    merchant: string;
    notes: string;
    // created_at: moment
}
interface Expense4 {
    id: Identifier;
    accountId: Identifier;
    amount: number;
    category: Category;
    merchant: string;
    notes: string;
    // created_at: moment
}
// Vue.axios.defaults.baseURL = 'http://localhost:8000/api';

@Module({ namespaced: true })
class Expense extends VuexModule {
    // public account_id: Identifier | null = null;
    // public amount = 0;
    // public category: Category = Category.None;
    // public merchant = '';
    // public notes = '';
    // public checked = '';
    public expense: Expense3 = {
        accountId: 1,
        amount: 0,
        category: Category.None,
        merchant: '',
        notes: '',
    };
    public expenses: Expense3[] = [];

    @MutationAction({ mutate: ['expenses'] })
    async createExpense(expense: Expense3) {
        // todo.checked = !todo.checked;
        console.log(expense);
        // await Promise.resolve();
        // const result = await Vue.axios.post('/api/expense', expense);
        // TODO: Add Error handling
        // const expenses = this.expenses;
        // expenses.unshift(result.data);
        return { expenses: this.expenses };
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
export default Expense;
