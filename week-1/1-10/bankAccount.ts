class BankAccount {
    private balance: number;

    public constructor(balance: number) {
        this.balance = balance;
    }

    public deposit(amount: number): void {
        this.balance += amount;
    }

    public withdraw(amount: number): void {
        if (amount <= this.balance) {
            this.balance -= amount;
        } else {
            console.log("Insufficient funds.");
        }
    }

    public showBalance(): void {
        console.log("Balance: " + this.balance);
    }
}

const bankAccount: BankAccount = new BankAccount(1000);

bankAccount.deposit(500);
bankAccount.showBalance();

bankAccount.withdraw(300);
bankAccount.showBalance();