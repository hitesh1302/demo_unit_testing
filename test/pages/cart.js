class Cart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        if (!item.name || item.price <= 0) throw new Error("Invalid item");
        const existing = this.items.find(i => i.name === item.name);
        if (existing) {
            existing.quantity += item.quantity || 1;
        } else {
            this.items.push({ ...item, quantity: item.quantity || 1 });
        }
    }

    removeItem(itemName) {
        this.items = this.items.filter(i => i.name !== itemName);
    }

    getTotal() {
        return this.items.reduce((total, i) => total + i.price * i.quantity, 0);
    }

    applyDiscount(code) {
        if (code === "SALE10") return this.getTotal() * 0.9;
        if (code === "SALE20") return this.getTotal() * 0.8;
        throw new Error("Invalid discount code");
    }

    clearCart() {
        this.items = [];
    }
}

module.exports = Cart;
