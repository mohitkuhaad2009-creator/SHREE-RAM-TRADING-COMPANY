// transaction.js

class TransactionManager {
    constructor() {
        this.transactions = this.loadTransactions();
    }

    addTransaction(amount, type) {
        const transaction = { amount, type, date: new Date().toISOString() };
        this.transactions.push(transaction);
        this.saveTransactions();
    }

    getBalance() {
        return this.transactions.reduce((acc, transaction) => {
            return transaction.type === 'credit' ? acc + transaction.amount : acc - transaction.amount;
        }, 0);
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }

    loadTransactions() {
        const transactions = localStorage.getItem('transactions');
        return transactions ? JSON.parse(transactions) : [];
    }
}

// Usage Example:
const transactionManager = new TransactionManager();
transactionManager.addTransaction(100, 'credit');
transactionManager.addTransaction(50, 'debit');
console.log('Current Balance:', transactionManager.getBalance());