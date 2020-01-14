import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  AddTicket(ticket): Observable<HttpEvent<any>> {

    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Cache-Control': 'no-cache'
    // });

    // const options = {
    //   headers: httpHeaders
    // }
    //    https://localhost:44390/api/Tickets

    return this.httpClient.post(
      'https://localhost:44390/api/Tickets',
      ticket,
      {
        reportProgress: true,
        observe: 'events'
      }
    ).pipe(
      tap(data =>
        console.log(data)

        ),
      catchError(this.handleError)

    )



  }

  private handleError(res: HttpErrorResponse) {
    console.error(res);
    return throwError(res.error || 'Server error');
  }


}
