<template>
    <div>
        <h1>Money Tracker</h1>
        <form>
            <div class="details">
                <input
                    name="amount"
                    class="form-input-element"
                    id="amount"
                    autocomplete="off"
                    placeholder="Amount"
                    type="number"
                    v-model="amount"
                    required="required"
                    min="0"
                    step="1"
                    data-error="Please enter an amount."
                />
                <input
                    name="merchant"
                    class="form-input-element"
                    id="merchant"
                    autocomplete="off"
                    placeholder="Merchant"
                    type="text"
                    v-model="merchant"
                    required="required"
                    data-error="Please enter your full name."
                />
                <input
                    name="category"
                    class="form-input-element"
                    id="category"
                    autocomplete="off"
                    placeholder="Category"
                    type="text"
                    v-model="category"
                    required="required"
                    data-error="Please enter the category."
                />
                <select
                    name="select_options"
                    class="form-select-element"
                    required="required"
                    data-error="Please select one option."
                    v-model="accountId"
                >
                    <option :value="null">
                        What payment method did you use?
                    </option>
                    <option
                        v-for="l in accounts"
                        v-bind:key="l.id"
                        :value="l.id"
                    >
                        {{ l.name }}
                    </option>
                </select>
                <input
                    name="notes"
                    class="form-input-element"
                    id="notes"
                    autocomplete="off"
                    placeholder="Notes"
                    type="text"
                    v-model="notes"
                />
                <input
                    class="form-button-element"
                    value="Add Expense Now"
                    type="button"
                    @click="someFnc"
                />
            </div>
        </form>
        <ExpenseList :items="expenses" :accounts="accounts" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, VModel } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import ExpenseList from '@/components/ExpenseList.vue';
import Account from '@/model/Account';
import Expense from '@/model/Expense';

const AccountModule = namespace('account');
const ExpenseModule = namespace('expense');

@Component({
    name: 'AddExpense',
    components: {
        ExpenseList,
    },
})
export default class AddExpense extends Vue {
    @Prop() private msg!: string;
    @ExpenseModule.State
    public expenses!: Expense[];

    @AccountModule.State
    public accounts!: Account[];

    // @VModel({type: Number})
    amount: null | string = null;

    // @VModel({ type: String })
    category: null | string = null;

    // @VModel({ type: String })
    merchant: null | string = null;

    // @VModel({ type: String })
    accountId: null | string = null;

    // @VModel({ type: String })
    notes: null | string = null;

    // expense: Expense = {
    //     amount: null,
    //     category: null,
    //     merchant: null,
    //     accountId: null,
    //     notes: ''
    // }

    @ExpenseModule.Action
    public loadExpenses!: () => [];

    @AccountModule.Action
    public loadAccounts!: () => [];

    someFnc(): void {
        const { amount, accountId, category, merchant, notes } = this;
        if (!amount || !accountId || !merchant || !category) {
            alert('You missed some fields');
            return;
        }

        let convertedAmount = Number((parseFloat(amount) * 100.0).toFixed(2));
        const expenseToCreate = {
            category: String(category),
            accountId: Number(accountId),
            merchant: String(merchant),
            amount: convertedAmount,
            notes: String(notes),
        };
        this.createExpense(expenseToCreate);
        this.amount = null;
        this.category = null;
        this.merchant = null;
        this.accountId = null;
        this.notes = null;
    }

    @ExpenseModule.Mutation
    public updateExpense!: (expense: Expense) => [];

    @ExpenseModule.Action
    public createExpense!: (expense: Expense) => [];

    created(): void {
        this.loadAccounts();
        this.loadExpenses();
    }
}
</script>

<style scoped lang="scss">
.form-input-element {
    padding: 1rem;
    height: 2rem;
}

.form-select-element {
    //   padding: 1rem;
    height: 4rem;
}

.form-button-element {
    //   padding: 1rem;
    height: 2rem;
}

.details {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>
