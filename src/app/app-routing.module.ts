import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

const routes: Routes = [
	{path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	{path: 'transactions', component: TransactionsComponent },
	{path: 'dashboard', component: DashboardComponent },
	{path: 'detail/:id', component: TransactionDetailComponent }
]

@NgModule({
	imports: [RouterModule.forRoot(routes) ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
