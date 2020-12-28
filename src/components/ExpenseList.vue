<template>
    <div>
        <ul class="cards">
            <li class="expense-li bb">
                <span class="s">Date of Expense</span>
                <span class="s">Amount</span>
                <span class="s">Merchant</span>
                <span class="s">Account</span>
                <span class="s">Notes</span>
            </li>
            <li class="expense-li" v-for="item in items" :key="item.id">
                <!-- <div class="s">1</div>
                <div class="t">2</div>
                <div class="s">3</div>
                <div class="t">4</div>
                <div class="s">5</div>
                <div class="t">6</div> -->
                <div class="s">
                    {{ item.createdAt | DateMe }} -
                    {{ item.createdAt | TimeMe }}
                </div>
                <div class="s">{{ item.amount | decentsitize | USD }}</div>
                <div class="s">{{ item.merchant }} ({{ item.category }})</div>
                <div class="s">{{ lookupAccountName(item.accountId) }} CC</div>
                <div class="s">{{ item.notes | NoNull }}</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import dayjs from 'dayjs';
const Expense = namespace('expense');

enum Category {
    None,
}

interface Expense4 {
    id: number;
    account_id: number;
    amount: number;
    category: Category;
    merchant: string;
    notes: string;
    created_at: string;
}

@Component({
    filters: {
        decentsitize(value: number): string {
            return (value / 100).toFixed(2);
        },
        USD(value: string): string {
            return `$${value}`;
        },
        DateMe(value: string): string {
            return dayjs(value).format('MM/DD/YYYY');
        },
        TimeMe(value: string): string {
            return dayjs(value).format('hh:mm A');
        },
        NoNull(value: string | null | undefined): string {
            console.log(value);
            return value === 'null' || value === null || value === undefined
                ? 'None'
                : value;
        },
    },
})
export default class ExpenseList extends Vue {
    @Prop() private items!: [];
    @Prop() private accounts!: [];
    @Expense.State
    public color!: string;
    @Expense.Action
    public updateChecked!: (expense: Expense4) => Expense4;
    lookupAccountName(accountId: number): string {
        return (
            this.accounts.find(
                (acc: Record<string, unknown>) => accountId === acc.id
            ) || { name: 'unknwon' }
        ).name;
    }
}
</script>

<style scoped lang="scss">
.s {
    flex: 1;
    display: flex;
    // background-color: blue;
    padding: 1rem;
    justify-content: start;
    // justify-self: start;
}
.cards {
    // max-width: 1200px;
    // margin: 0 auto;
    // display: flex;
    // flex-direction: column;
    // grid-gap: 1rem;
    // grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.bb {
    border-bottom: 0.1rem solid white;
}
.expense-li {
    // flex: 1;
    display: flex;
    // justify-content: space-between;
    // align-items: stretch;
    background-color: green;
    color: white;
    // padding: 1rem;
}
</style>
