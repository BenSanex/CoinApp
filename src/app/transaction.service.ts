import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Transaction } from './transaction';
import { MessageService } from './message.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable()
export class TransactionService {

  constructor(
  			private http: HttpClient, 
  			private messageService: MessageService) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}`)
      .pipe(
        tap(transactions => this.log('fetched transactions')),
        catchError(this.handleError('getTransactions', []))
        );
  }

  getTransaction(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(transactions => this.log(`fetched transaction with id:${id}`)),
        catchError(this.handleError<any>('getTransaction', []))
        );
  }

  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post(`${this.apiUrl}`, transaction, httpOptions).pipe(
      tap((transaction: Transaction) => this.log(`added transaction w/ id:${transaction.id}`)),
      catchError(this.handleError<any>('addTransaction'))
      );
  }

  updateTransaction(transaction: Transaction): Observable<any> {
    return this.http.put(`${this.apiUrl}/${transaction.id}`, transaction, httpOptions).pipe(
      tap(_ => this.log(`updated transaction id=${transaction.id}`)),
    catchError(this.handleError<any>('updateTransaction'))
    );
  }

  deleteTransaction(transaction: Transaction | number): Observable<Transaction> {
    const id =  typeof transaction === 'number' ? transaction : transaction.id;

    return this.http.delete<Transaction>(`${this.apiUrl}/${id}`, httpOptions).pipe(
      tap(_ => this.log(`deleted transaction id=${id}`)),
      catchError(this.handleError<Transaction>('deleteTransaction'))
      );
  } 

  private log(message: string) {
  	this.messageService.add('TransactionService:' + message)
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
          // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
    }
  }

  private apiUrl = 'http://localhost:3000/line_items'
}
