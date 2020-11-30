<template>
    <div>
        <form>
            <div class="details">
                <input
                    name="full_name"
                    id="full_name"
                    placeholder="Merchant"
                    type="text"
                    :value="expense.merchant"
                    required="required"
                    data-error="Please enter your full name."
                />

                <select
                    name="select_options"
                    required="required"
                    data-error="Please select one option."
                >
                    <option value=""
                        >What service are you interested in?</option
                    >
                    <option value="Web Design">Web Design</option>
                    <option value="Web Support">Web Support</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="CMS Integration">CMS Integration</option>
                    <option value="Other">Other</option>
                </select>
                <input
                    value="Add Expense Now"
                    type="button"
                    @click="createExpense"
                />
            </div>
        </form>
        <Griddy :items="expenses" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import Griddy from '@/components/Griddy.vue';

const Expense = namespace('expense');

interface Expense2 {
    id: Identifier;
    account_id: Identifier;
    amount: number;
    category: Category;
    merchant: string;
    notes: string;
    // created_at: moment
}
interface Expense5 {
    id: Identifier;
    account_id: Identifier;
    amount: number;
    category: Category;
    merchant: string;
    notes: string;
    // created_at: moment
}

@Component({
    name: 'HelloWorld',
    components: {
        Griddy,
    },
})
export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
    @Expense.State
    public expenses!: Expense2[];
    @Expense.State
    public expense!: Expense5;

    @Expense.Action
    public loadExpenses!: () => [];

    @Expense.Mutation
    public updateExpense!: (expense2: Expense2) => [];

    @Expense.Mutation
    public createExpense!: (expense3: Expense2) => [];

    created() {
        this.loadExpenses();
    }
}
</script>

<style scoped lang="scss"></style>
