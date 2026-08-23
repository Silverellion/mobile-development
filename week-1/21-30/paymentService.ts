interface Payment {
    pay(amount: number): void;
}

class CashPayment implements Payment {
    public pay(amount: number): void {
        console.log("Paid $" + amount + " using cash.");
    }
}

class CardPayment implements Payment {
    public pay(amount: number): void {
        console.log("Paid $" + amount + " using card.");
    }
}

const cashPayment: Payment = new CashPayment();
cashPayment.pay(50);

const cardPayment: Payment = new CardPayment();
cardPayment.pay(100);