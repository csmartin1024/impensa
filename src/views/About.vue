<template>
    <div class="about">
        <ExpenseList />
    </div>
</template>

<script>
import ExpenseList from '@/components/ExpenseList.vue';

export default {
    name: 'About',
    components: {
        ExpenseList,
    },
};
</script>

<style scoped lang="scss"></style>
