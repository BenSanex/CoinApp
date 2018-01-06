import { Component, OnInit, Input } from '@angular/core';
import { Transaction } from '../transaction';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
	@Input() transaction: Transaction;

  constructor(
  	private route: ActivatedRoute,
		private transactionService: TransactionService,
		private location: Location) { }

  ngOnInit(): void {
  	this.getTransaction();
  }

  getTransaction(): void {
  	const id = +this.route.snapshot.paramMap.get('id');
  	this.transactionService.getTransaction(id)
  		.subscribe(transaction => this.transaction = transaction)
  }

  save(): void {
    this.transactionService.updateTransaction(this.transaction)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
  	this.location.back();
  }

}
