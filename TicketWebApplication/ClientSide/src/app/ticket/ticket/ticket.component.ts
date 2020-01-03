import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

import {TicketService} from "../../service/ticket.service";

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  constructor(
    private ticketService: TicketService
    ) { }

  newTicket: FormGroup;


  ngOnInit() {
    this.newTicket = new FormGroup ({
    //  'PLU': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'PLU': new FormControl(null),
  
      'Thefile': new FormControl(null)
    })
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newTicket.patchValue({
      Thefile : file
    });
    this.newTicket.get('Thefile').updateValueAndValidity()
  }

  submitForm() {

    console.log(this.newTicket.value)
  
    var formData: any = new FormData();
    formData.append("PLU", this.newTicket.get('PLU').value);
    formData.append("Thefile", this.newTicket.get('Thefile').value);


    this.ticketService.AddTicket(formData)

    // this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )
  }


}
