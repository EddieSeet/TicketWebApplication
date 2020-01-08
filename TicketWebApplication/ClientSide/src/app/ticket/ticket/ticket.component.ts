import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

import {TicketService} from "../../service/ticket.service";
// import { FileValidator } from 'ngx-material-file-input';



@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


//for more than 1 plu
numbPlu = 1;
listofPlu = [];

  constructor(
    private ticketService: TicketService,
    
    private _formBuilder: FormBuilder
    
    ) { }


   
  newTicket: FormGroup;


  ngOnInit() {
    this.newTicket = new FormGroup ({
    //  'PLU': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'PLU': new FormControl(null, [Validators.required, Validators.minLength(20)]),
  
      'Thefile': new FormControl(null)
    })



    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [null, [Validators.required, Validators.minLength(20)] ]
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

//adding plu
Add(){
console.log(this.secondFormGroup.value.secondCtrl)
this.listofPlu.push(this.secondFormGroup.value.secondCtrl)
console.log(this.listofPlu)


//reseting form
this.secondFormGroup.reset();
Object.keys(this.secondFormGroup.controls).forEach(key => {
  this.secondFormGroup.controls[key].setErrors(null)
});

}





}
