import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../services/auth.service';

declare var firebase:any;
declare var $:any;
declare var window:any;
declare var localStorage:any;
declare var JSON:any;

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.css']
})
export class AuthModalComponent implements OnInit {
  app;
  user: any = {
    email: '',
    password: ''
  }
  profile: any = {
    email: '',
    firstName: '',
    lastName: '',
    thumb: ''
  }
  files:any;

  constructor(private _authService: AuthServiceProvider) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
        console.log(user)
        if (user) {
          this.initProfile(user.uid);
        }
      });
  }

  initProfile(uid = firebase.auth().currentUser.uid || '') {
    var self = this;
    this._authService.getProfile(uid).then(function(response) {
      self.profile = response;
      console.log(response)
    });
  }

  btnRegisterClick(event) {
    var self = this;
    if (self.user.email.trim() == "" || self.user.password.trim() == "")
      return window.showError('Please enter your email and password.');
    $(event.target).addClass('btn-loading');
    firebase.auth().createUserWithEmailAndPassword(self.user.email, self.user.password).then(function(res) {
      if(res && res.user && res.user.emailVerified === false){
        res.user.sendEmailVerification().then(function() {
          $(event.target).removeClass('btn-loading');
          $("#signupModal").modal('hide');
          window.showSuccess('Please check your email to continue.');
          var userData = {
            firstName: 'Joe',
            lastName: 'Hanson',
            thumb: 'downloadUrlForProfilePicture.jpg'
          };
          self._authService.saveUser(res.user.uid, userData).then((res)=>{
          });
        }).catch((error) => {
          $(event.target).removeClass('btn-loading');
          window.showError(error.message);
        });
      }
    }).catch((error) => {
      $(event.target).removeClass('btn-loading');
      window.showError(error.message);
    });
  }

  btnLoginClick(event) {
    var self = this;
    if (self.user.email.trim() == "" || self.user.password.trim() == "")
      return window.showError('Please enter your email and password.');

    $(event.target).addClass('btn-loading');
    firebase.auth().signInWithEmailAndPassword(self.user.email.trim(), self.user.password.trim()).then((result) => {
      $(event.target).removeClass('btn-loading');
      if (result && result.user) {
        if (result.user.emailVerified) {
          self.user = result.user;
          $("#loginModal").modal('hide');
          $(event.target).removeClass('btn-loading');
        }
        // } else {
        //   window.showError('Please verify your email first!');
        //   $(event.target).removeClass('btn-loading');
        // }
      } else {
        window.showError('Email / Password combination is not correct.');
        $(event.target).removeClass('btn-loading');
      }
    }).catch((error) => {
      $(event.target).removeClass('btn-loading');
      window.showError('Something went wrong!');
    });
  }

  btnSaveProfileClick(event) {
    var self = this;
    if (firebase.auth() && firebase.auth().currentUser) {
      // this.user = firebase.auth().currentUser;
      // if (this.files && this.files.length > 0) {
        // var ext = this.files[0].name.split(".");
        // ext = ext[ext.length-1].toLowerCase();
      // }
      self.saveUserProfile(event);
    }
  }

  saveUserProfile(event, fileUrl:any = null) {
    var self = this;
    if (this.profile.thumb) {
      //profileData.photoURL = this.profile.thumb;
    }
    $(event.target).addClass('btn-loading');
    this._authService.updateProfile(firebase.auth().currentUser.uid, this.profile, this.files).then(function(result) {
      self.files = [];
      self.initProfile();
      $("#profileModal").modal('hide');
      $(event.target).removeClass('btn-loading');
    }, (error) => {
      $(event.target).removeClass('btn-loading');
      window.showError(error.message);
    });
  }

  btnChangeProfileClick() {
    $("#profileImageInput").click();
  }

  onFileChange(event) {
    this.files = event.target.files;

    var ext = this.files[0].name.split(".");
    ext = ext[ext.length-1].toLowerCase();
    var arrayExtensions = ["jpg" , "jpeg", "png", "bmp", "gif"];
    if(arrayExtensions.lastIndexOf(ext) != -1)
    {
      // var reader = new FileReader();
      // reader.readAsDataURL(this.files[0]);
      // reader.onload = () => {
      //  this.profile.thumb = reader.result;
      // };
      // reader.onerror = (error: any) => {
      //  window.showError(error.message);
      // };
    } else {
      this.files = null;
      window.showError('Invalid image format.');
    }
  }
}
