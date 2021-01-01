<template>
    <div>
        <h1>Moneyz</h1>
        <h4>New Expense</h4>
        <form class="details">
            <input
                name="amount"
                class="form-element"
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
                class="form-element"
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
                class="form-element"
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
                class="form-element"
                required="required"
                data-error="Please select one option."
                v-model="accountId"
            >
                <option :value="null">Select Your Payment Method</option>
                <option v-for="l in accounts" v-bind:key="l.id" :value="l.id">
                    {{ l.name }}
                </option>
            </select>
            <input
                name="notes"
                class="form-element"
                id="notes"
                autocomplete="off"
                placeholder="Notes"
                type="text"
                v-model="notes"
            />
            <button class="form-element button" @click="someFnc">Add</button>
        </form>
        <h4>Expenses</h4>
        <ExpenseList :items="expenses" :accounts="accounts" />
        <button class="form-element button" @click="someOtherFnc">
            Load More
        </button>
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

    amount: null | string = null;
    category: null | string = null;
    merchant: null | string = null;
    accountId: null | string = null;
    notes: null | string = null;

    @ExpenseModule.Action
    public loadExpenses!: ({ limit }: { limit: number }) => [];

    @AccountModule.Action
    public loadAccounts!: () => [];

    @ExpenseModule.Action
    public loadMoreExpenses!: ({
        limit,
        offset,
    }: {
        limit: number;
        offset: number;
    }) => [];

    someOtherFnc(): void {
        this.loadMoreExpenses({ limit: 5, offset: this.expenses.length + 1 });
    }
    someFnc(event: Event): void {
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
        event.preventDefault();
    }

    @ExpenseModule.Mutation
    public updateExpense!: (expense: Expense) => [];

    @ExpenseModule.Action
    public createExpense!: (expense: Expense) => [];

    created(): void {
        this.loadAccounts();
        this.loadExpenses({ limit: 5 });
    }
}
</script>

<style scoped lang="scss">
h1 {
    color: white;
    background-color: green;
    padding: 1rem;
}
.details {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
}
.form-element {
    width: 100%;
    padding: 1rem;
    margin: 0.3rem;
}

.hom {
    display: none;
}

@media only screen and (min-width: 768px) {
    .form-element {
        width: 33%;
        padding: 1rem;
        margin: 0.3rem;
    }
    .hom {
        display: block;
    }
}
</style>
