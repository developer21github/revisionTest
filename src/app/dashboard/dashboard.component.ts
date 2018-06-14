import { Component, OnInit } from '@angular/core';

import * as Janus from 'janus-gateway-js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  janus;

  filter: any = '';

  constructor() {
    // this.janus = new Janus.Client('address', {
    //   token: 'token',
    //   apisecret: 'apisecret'
    // });

    // this.janus.createConnection('id').then(function(connection) {
    //   connection.createSession().then(function(session) {
    //     session.attachPlugin('bla').then(function(plugin) {
    //       plugin.send({}).then(function(response){});
    //       plugin.on('message', function(message) {});
    //       plugin.detach();
    //     });
    //   });
    // });
  }

  ngOnInit() {
  }

}
