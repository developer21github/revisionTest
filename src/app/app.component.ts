import { Component } from '@angular/core';
import { Router } from '@angular/router';
declare var firebase: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  route;
  user;

  constructor(public router: Router) {
    this.router.events.subscribe((val) => {
      if (this.route !== this.router.url) {
        this.route = this.router.url;
      }
  });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        console.log(this.route);
        if (this.route === '' || this.route === '/') {
          this.router.navigateByUrl('/dashboard')
        }
      } else {
        this.user = user;
        this.router.navigateByUrl('')
      }
    });
  }

  title = 'app works!';

}
