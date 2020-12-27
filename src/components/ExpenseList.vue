<template>
    <div>
        <ul class="cards">
            <li class="card" v-for="item in items" :key="item.id">
                <div class="s">{{ item.id }}</div>
                <div class="s">{{ lookupAccountName(item.accountId) }}</div>
                <div class="s">{{ item.amount }}</div>
                <div class="s">{{ item.category }}</div>
                <div class="s">{{ item.createdAt }}</div>
                <div class="s">{{ item.merchant }}</div>
                <div @click="updateChecked(item)" class="s">
                    {{ item.notes }}
                </div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
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
    // created_at: moment
}

@Component
export default class ExpenseList extends Vue {
    @Prop() private items!: [];
    @Prop() private accounts!: [];
    @Expense.State
    public color!: string;
    @Expense.Action
    public updateChecked!: (expense: Expense4) => Expense4;
    lookupAccountName(accountId: number) {
        return (this.accounts.find((acc: Record<string, unknown>) => accountId === acc.id) || { name: 'unknwon'}).name;
    }
}
</script>

<style scoped lang="scss">
.wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
.letter {
    background-color: #0069b3;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    font-size: 16px;
    color: white;
    transition: all 0.3s ease;
}

.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.card {
  background-color: green;
  color: white;
  padding: 1rem;
  height: 5rem;
}

// @media (min-width: 600px) {
//   .cards { grid-template-columns: repeat(2, 1fr); }
// }

// @media (min-width: 900px) {
//   .cards { grid-template-columns: repeat(3, 1fr); }
// }

</style>
