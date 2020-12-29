<template>
    <div>
        <div class="expenses">
            <div class="row-header">
                <span class="row-header-elem">Date</span>
                <span class="row-header-elem">Amount</span>
                <span class="row-header-elem">Merchant</span>
                <span class="row-header-elem">Account</span>
                <span class="row-header-elem hom">Notes</span>
            </div>
            <div class="row" v-for="item in items" :key="item.id">
                <div class="row-elem">
                    <div>{{ item.createdAt | DateMe }}</div>
                    <div class="hom">{{ item.createdAt | TimeMe }}</div>
                </div>
                <div class="row-elem">
                    {{ item.amount | decentsitize | USD }}
                </div>
                <div class="row-elem">
                    {{ item.merchant }} ({{ item.category }})
                </div>
                <div class="row-elem">
                    {{ lookupAccountName(item.accountId) }}
                </div>
                <div class="row-elem hom">{{ item.notes | NoNull }}</div>
            </div>
        </div>
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
            return value === '' ||
                value === 'null' ||
                value === null ||
                value === undefined
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
.expenses {
    padding: 1rem;
}
.row-header {
    display: flex;
    // border-bottom: 0.1rem solid green;
    background-color: green;
    padding: 1rem;
    color: white;
}
.row-header-elem {
    flex: 1;
    display: flex;
    flex-direction: column;

    justify-content: start;
}
.row {
    display: flex;
    font-size: 1rem;
    justify-content: center;
    align-items: center;
    border-bottom: 0.1rem solid black;
}

.row-elem {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    justify-content: start;
}

.hom {
    display: none;
}

@media only screen and (min-width: 768px) {
    .expense-li {
        font-size: 1rem;
        background-color: blue;
        color: white;
    }

    .hom {
        display: block;
    }
}
</style>
