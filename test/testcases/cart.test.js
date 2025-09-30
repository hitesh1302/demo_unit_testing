const {expect} = require('chai');
const Cart = require('../pages/cart');

describe('Shopping Cart Feature', function(){
    let cart;

    beforeEach(function(){
        cart =new Cart();
    });

    it('Add item to cart', function(){
        cart.addItem({name:'Apple', price:100, quantity:1});
        expect(cart.items).to.have.lengthOf(1);
        expect(cart.items[0].quantity).to.equal(1);
    });
    it('Remove item from cart', function(){
        cart.addItem({name:'Apple',price:100});
        cart.removeItem('Apple');
        expect(cart.items.length).to.equal(0);
    });
    it('Calculate total price', function(){
        cart.addItem({name:'Apple',price:100,quantity:2});
        cart.addItem({name:'Banana',price:60, quantity:1});
        expect(cart.getTotal()).to.equal(260);
    });
    it('Apply discount code', function(){
        cart.addItem({name:'Apple',price:100,quantity:2});
        expect(cart.applyDiscount('SALE10')).to.equal(180);
        expect(cart.applyDiscount('SALE20')).to.equal(160);  
    });
    it('Should throw error for invalid discount code', function(){
        expect(() => cart.applyDiscount('Invalid')).to.throw("Invalid discount code");
    });
    it('Clear cart', function(){
        cart.addItem({name:'Apple', price:100});
        cart.clearCart();
        expect(cart.items.length).to.equal(0);
    });
    });