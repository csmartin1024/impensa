// enum Category {
//     None,
// }

// interface Expense3 {
//     // id: Identifier;
//     accountId: number;
//     amount: number;
//     category: string;
//     merchant: string;
//     notes: string;
//     // created_at: moment
// }
export default interface Expense {
    id?: number;
    accountId: number;
    amount: number;
    category: string;
    merchant: string;
    notes: string;
    // created_at: moment
}
