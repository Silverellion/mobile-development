class Account {
    public accountNumber: string;
    private balance: number;
    public readonly owner: string;

    public constructor(
        accountNumber: string,
        balance: number,
        owner: string
    ) {
        this.accountNumber = accountNumber;
        this.balance = balance;
        this.owner = owner;
    }

    public showInfo(): void {
        console.log("Account Number: " + this.accountNumber);
        console.log("Balance: " + this.balance);
        console.log("Owner: " + this.owner);
    }
}

const account: Account = new Account("12345", 1000, "John");

account.accountNumber = "67890";
// account.balance = 2000;        // error: private
// account.owner = "Alice";       // error: readonly

account.showInfo();