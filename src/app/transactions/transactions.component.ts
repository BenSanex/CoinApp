import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  selectedTransaction: Transaction;
	transactions: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  	this.getTransactions();
  }
  getTransactions(): void {
  	this.transactionService.getTransactions()
  		.subscribe(transactions => this.transactions = transactions);
  }

  add(coin: string): void {
    coin = coin.trim();
    if (!coin) { return; }
    this.transactionService.addTransaction({coin} as Transaction)
      .subscribe( transaction => {
        this.transactions.push(transaction);
      });
  }
  
  delete(transaction: Transaction): void {
    this.transactions = this.transactions.filter(t => t !== transaction);
    this.transactionService.deleteTransaction(transaction).subscribe();
  };
  onSelect(transaction: Transaction): void{
    this.selectedTransaction = transaction;
  }
}
