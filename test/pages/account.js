class Account {
    constructor(owner, balance = 0) {
        if (!owner) throw new Error("Owner is required");
        if (balance < 0) throw new Error("Balance cannot be negative");
        this.owner = owner;
        this.balance = balance;
    }

    deposit(amount) {
        if (amount <= 0) throw new Error("Deposit must be positive");
        this.balance += amount;
        return this.balance;
    }

    withdraw(amount) {
        if (amount <= 0) throw new Error("Withdrawal must be positive");
        if (amount > this.balance) throw new Error("Insufficient funds");
        this.balance -= amount;
        return this.balance;
    }

    transfer(targetAccount, amount) {
        if (!(targetAccount instanceof Account)) throw new Error("Invalid target account");
        this.withdraw(amount);
        targetAccount.deposit(amount);
        return {
            from: this.owner,
            to: targetAccount.owner,
            amount
        };
    }

    getBalance() {
        return this.balance;
    }
}

module.exports = Account;
