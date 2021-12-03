import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroceriesServiceService {

  items: any= [];
  dataChanged$: Observable<boolean>;
  private dataChangeSubject: Subject<boolean>;
  baseUrl = "http://localhost:8080";

  constructor(public http: HttpClient) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
   }

   private extractData(res: Response) {
    let body = res;
    return body || {}
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
  
  getItems() {
    return this.http.get(this.baseUrl + '/api/groceries').pipe(
      map(this.extractData),
      catchError(this.handleError)
    )
  }

  removeItem(item) {
    const url = this.baseUrl + "/api/groceries/" + item._id;
    return this.http.delete(url).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    })
  }

  addItem(item) {
    this.http.post(this.baseUrl + '/api/groceries/', item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true)
    })
  }

  editItem(item, index) {
    this.http.put(this.baseUrl + "/api/groceries/" + item.id, item).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true)
    });
  }
}