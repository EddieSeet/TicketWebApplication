import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;
  admloggedIn = false;
 
  constructor(private router: Router) { }

  AdmloggedIn = false;


  login(username: string, password: string) {
    this.loggedIn = (username == "user" && password == "123")
    this.admloggedIn = (username == "adm" && password == "123")
    
    if (this.loggedIn) {
      console.log(this.loggedIn)
      this.router.navigate(["/Ticket"]);
    }
    else if(this.admloggedIn){
      console.log(this.admloggedIn)
      this.router.navigate(["/Summary"]);
    }

    


  }

  
  logout() {
    this.loggedIn = false;
    this.router.navigate(["/"])
  }

  isUserAuthenticated() {
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn) 
        }, 1000);
      }
      );
    return promise
  }

  isAdmAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.admloggedIn) 
        }, 1000);
      }
      );
    return promise
  }




}
