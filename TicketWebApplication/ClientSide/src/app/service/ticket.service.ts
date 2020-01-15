import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  // AddTicket(ticket): Observable<HttpEvent<any>> {
  async AddTicket(PLU, afile) {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
      'Cache-Control': 'no-cache',
      "Accept": "*/*"
    });

    const options = {
      headers: httpHeaders
    }
    //    https://localhost:44390/api/Tickets

    //    console.log(ticket)


    // return this.httpClient.post<any>('https://localhost:44390/api/Tickets', ticket
    // , options
    //   // {
    //   //   reportProgress: true,
    //   //   observe: 'events'
    //   // }
    // ).pipe(
    //   tap(data =>
    //     console.log(data)

    //     ),
    //   catchError(this.handleError)

    // )

    for (var i = 0; i < PLU.length; i++) {

      var formData: any = new FormData();
      formData.append("PLU", PLU[i]);

      if (i == 0) {
        formData.append("Thefile", afile);
      }
      else if (i > 0) {
        formData.append("FileName", afile.name);
        //  formData.append("Thefile", afile.name);
      }

      //console logging form data value. 
      //   for (var value of formData.values()) {
      //     console.log( typeof(value)); 
      //  }


      //  this.ticketService.AddTicket(formData)
      // this.httpClient.post<any>("https://localhost:44390/api/Tickets", formData).subscribe(
      //   (res) => console.log(res),
      //   (err) => console.log(err)
      // )
      await this.serving(formData)

    }





  }


  serving(formData) {

    return new Promise((resolve, reject) => {

      this.httpClient.post<any>("https://localhost:44390/api/Tickets", formData).subscribe(
        (res) => { console.log(res), resolve()},
        (err) => { console.log(err), reject() },
      )})
}

  private handleError(res: HttpErrorResponse) {
    console.error(res);
    return throwError(res.error || 'Server error');
  }


}
