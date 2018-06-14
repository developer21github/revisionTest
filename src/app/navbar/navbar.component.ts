import { Component, OnInit, Input } from '@angular/core';

declare var firebase: any;
declare var $:any;
declare var localStorage:any;
declare var JSON:any;
declare var window:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() active = '';
  @Input() user;

  constructor() { }

  ngOnInit() {
  }

  btnSignUpClick() {
    $("#signupModal").modal('show');
  }

  btnLoginClick() {
    $("#loginModal").modal('show');
  }

  btnEditProfileClick() {
    if (!this.user) {
      return window.showError('Please login first!');
    }
    $("#profileModal").modal('show');
  }

  signOut() {
    firebase.auth().signOut();
  }
}
