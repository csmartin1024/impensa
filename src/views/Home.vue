<template>
    <div class="home">
        <AddExpense msg="You just got gooped!" />
    </div>
</template>

<script>
// @ is an alias to /src
import AddExpense from '@/components/AddExpense.vue';

export default {
    name: 'Home',
    components: {
        AddExpense,
    },
};
</script>

<style scoped lang="scss">
.image {
    object-fit: cover;
    height: 300px;
}
</style>
