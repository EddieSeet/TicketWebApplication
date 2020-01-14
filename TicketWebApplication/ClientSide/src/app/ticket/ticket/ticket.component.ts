import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';

import { TicketService } from "../../service/ticket.service";
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
  //checking for  duplicate plu (in input)
  duplicate: boolean = false
  //duplicate position
  dupPosition: number

  //controling form
  numbStep = 1;
  //make sure they can only proceed after the current fields are valid.
  isLinear = true;

  //checking the file is valid (.pdf extension)
  extension: boolean = false




  constructor(
    private ticketService: TicketService,

    private _formBuilder: FormBuilder

  ) { }



  newTicket: FormGroup;



  ngOnInit() {
    this.newTicket = new FormGroup({
      //  'PLU': new FormControl(null, [Validators.required, Validators.minLength(20)]),

      'Thefile': new FormControl([null])
    })



    this.firstFormGroup = this._formBuilder.group({
      //   Thefile: new FormControl(null, [Validators.required, this.blankSpaces]),
      Thefile: new FormControl(null, [Validators.required]),

    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [null, [Validators.required, Validators.minLength(20)]]
    })

  }






  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];


    var result = file.name.split(".")
    //console.log( result[result.length -1] =="pdf")

    // 
    if (
      result[result.length - 1] == "pdf"
    ) {

      this.newTicket.patchValue({
        Thefile: file
      });
      this.newTicket.get('Thefile').updateValueAndValidity()

      this.extension = false
      //    console.log("Extension error:" +this.extension)

      //      console.log(this.newTicket.get("Thefile").value.name)

    }
    else if (
      result[result.length - 1] != "pdf"

    ) {

      this.firstFormGroup.controls['Thefile'].setErrors({ 'valid': false });

      this.extension = true;
      //console.log("Extension error:" + this.extension)

    }

  }



  submitForm() {

   // console.log(this.listofPlu.length)
    //console.log(this.newTicket.get("Thefile").value.name)


    for (var i = 0; i < this.listofPlu.length; i++) {

      var formData: any = new FormData();
      formData.append("PLU", this.listofPlu[i]);

      if (i == 0) {
        formData.append("Thefile", this.newTicket.get('Thefile').value);
      }
      else if (i > 0) {
        formData.append("Thefile", this.newTicket.get('Thefile').value.name);
      }

      //console logging form data value. 
      for (var value of formData.values()) {
        console.log( typeof(value)); 
     }

      this.ticketService.AddTicket(formData)

    }




    // this.http.post('http://localhost:4000/api/create-user', formData).subscribe(
    //   (response) => console.log(response),
    //   (error) => console.log(error)
    // )
  }

  //adding plu
  Add() {
    console.log(this.secondFormGroup.value.secondCtrl)

    //check that this have not been added

    if (this.listofPlu.includes(this.secondFormGroup.value.secondCtrl) == false) {

      this.listofPlu.push(this.secondFormGroup.value.secondCtrl)
      console.log(this.listofPlu)

      //reseting form
      this.secondFormGroup.reset();
      Object.keys(this.secondFormGroup.controls).forEach(key => {
        this.secondFormGroup.controls[key].setErrors(null)
      });


    }
    else if (this.listofPlu.includes(this.secondFormGroup.value.secondCtrl) == true) {

      console.log(this.listofPlu.indexOf(this.secondFormGroup.value.secondCtrl))

      this.secondFormGroup.controls['secondCtrl'].setErrors({ 'valid': false });

      this.duplicate = true
      this.dupPosition = this.listofPlu.indexOf(this.secondFormGroup.value.secondCtrl)

    }



    //adding the value to the list and reset form.
    // this.listofPlu.push(this.secondFormGroup.value.secondCtrl)
    // console.log(this.listofPlu)

    // //reseting form
    // this.secondFormGroup.reset();
    // Object.keys(this.secondFormGroup.controls).forEach(key => {
    //   this.secondFormGroup.controls[key].setErrors(null)
    // });

  }





}
