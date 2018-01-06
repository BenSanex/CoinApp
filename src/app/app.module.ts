import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessageService } from './message.service';
import { MessagesComponent } from './messages/messages.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionService } from './transaction.service';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionSearchComponent } from './transaction-search/transaction-search.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    TransactionsComponent,
    TransactionDetailComponent,
    DashboardComponent,
    TransactionSearchComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, AppRoutingModule
  ],
  providers: [MessageService, TransactionService],
  bootstrap: [AppComponent]
})

export class AppModule { }
