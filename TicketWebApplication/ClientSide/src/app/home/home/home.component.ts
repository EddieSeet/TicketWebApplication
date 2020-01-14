import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../auth/auth.service"
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  onLogin(username: HTMLInputElement, password: HTMLInputElement) {
    this.authService.login(username.value, password.value);
  }

}
