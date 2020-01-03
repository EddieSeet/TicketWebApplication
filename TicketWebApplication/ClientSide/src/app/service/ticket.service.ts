import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, tap, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  AddTicket(ticket){
    
    // const httpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Cache-Control': 'no-cache'
    // });

    // const options = {
    //   headers: httpHeaders
    // }
//    https://localhost:44390/api/Tickets
    this.httpClient.post('https://localhost:44390/api/Tickets', ticket).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    // this.httpClient.post("http://localhost:3000/api/enquiry", ticket)
    // .subscribe((respond) => {
    //   console.log(respond)
    //   //this.enquiryList.push(respond);
    //   // this.friendUpdated.emit();
    // });


  }

}
