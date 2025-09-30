const {expect} = require('chai');
const Account = require('../pages/account');

describe('User Account', function(){
    let account;

    beforeEach(function(){
        account = new Account('Alice', 500);
        
    })
    it('Should create account with valid owner and balance', function(){
        expect(account.owner).to.equal('Alice');
        expect(account.balance).to.equal(500);
    });
    it('Throw error if owner is missing', function(){
        expect(() => new Account()).to.throw('Owner is required');
    });
    it('Throw error if initial balance is negative', function(){
        expect(() => new Account('Charlie', -50)).to.throw('Balance cannot be negative');
    });
    it('Deposit money into account', function(){
        expect(account.deposit(300)).to.equal(800);
    });
    it('Throw error for non-positive deposit', function(){
        expect(() => account.deposit(0)).to.throw('Deposit must be positive');
        expect(() => account.deposit(-100)).to.throw('Deposit must be positive');
    });
    it('Withdraw money from account', function(){
        expect(account.withdraw(200)).to.equal(300);
    });
    it('Throw error for non-positive withdrawal', function(){
        expect(() => account.withdraw(0)).to.throw('Withdrawal must be positive');
        expect(() => account.withdraw(-50)).to.throw('Withdrawal must be positive');
    });
    it('Throw error for insufficient funds', function(){
        expect(() => account.withdraw(700)).to.throw('Insufficient funds');
    });
    it('Transfer money between accounts', function(){
        const targetAccount = new Account('Bob', 200);
        const result = account.transfer(targetAccount, 200);
        expect(account.getBalance()).to.equal(300);
        expect(targetAccount.getBalance()).to.equal(400);
        expect(result).to.deep.equal({from: 'Alice', to: 'Bob', amount:200});
    });
    it('Throw error for invalid target account', function(){
        expect(() => account.transfer({}, 100)).to.throw('Invalid target account');
    });
});