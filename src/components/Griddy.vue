<template>
    <div>
        <ul>
            <li class="wrapper" v-for="item in items" :key="item.id">
                <div class="letter">{{ item.id }}</div>
                <div class="letter">{{ item.accountId }}</div>
                <div class="letter">{{ item.amount }}</div>
                <div class="letter">{{ item.category }}</div>
                <div class="letter">{{ item.createdAt }}</div>
                <div class="letter">{{ item.merchant }}</div>
                <div @click="updateChecked(item)" class="letter">
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

interface Expense4 {
    id: Identifier;
    account_id: Identifier;
    amount: number;
    category: Category;
    merchant: string;
    notes: string;
    // created_at: moment
}

@Component
export default class Griddy extends Vue {
    @Prop() private items!: [];
    @Expense.State
    public color!: string;
    @Expense.Action
    public updateChecked!: (expense: Expense4) => Expense4;
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
</style>
