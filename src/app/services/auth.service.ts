import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

declare var firebase:any;

@Injectable()
export class AuthServiceProvider {
  actionCodeSettings:any = {};
  userProfileRef:any = 'profiles';
  db:any;
  storage:any;

  constructor() {
    this.actionCodeSettings = {
      url: window.location.href,
      handleCodeInApp: true
    };
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true });

    this.storage = firebase.storage().ref();
  }

  verifyEmail(email): Promise<any> {
    return new Promise(resolve => {
      firebase.auth().sendSignInLinkToEmail(email, this.actionCodeSettings).then(function() {
        console.log('Sent email');
        resolve({});
      }).catch(function(error) {
        console.log(error.message);
      });
    });
  }

  uploadFile(filePath:any, file:any): Promise<any> {
    var self = this;
    return new Promise(resolve => {
      if (file) {
        self.storage.child(filePath).put(file).then(function(res) {
          // const image = self.storage.ref(self.userProfileRef).child(filePath);
          const urlPromise = res;
          resolve(urlPromise);
        }).catch(function(error) {
          resolve(error);
        });
      }
    });
  }

  saveUser(userId:any, data:any): Promise<any> {
    return new Promise(resolve => {
      this.db.collection("profiles").doc(userId).set(data).then(function(res) {
        resolve(res);
      }).catch(function(error) {
        resolve(error);
      });
    });
  }

  // getProfiles(): Promise<any> {
  //   return new Promise(resolve => {
  //     this.db.collection("profiles").get().then(function(res) {
  //       var data:any = [];
  //       res.forEach((doc) => {
  //         data.push(doc.data());
  //       });
  //       resolve(data);
  //     }).catch(function(error) {
  //       resolve(error);
  //     });
  //   });
  // }

  setProfile(uid, profile, files = null):Promise<any> {
    var self = this;
    if (!!profile.thumb && files && files[0]) {
      return new Promise(resolve => {
        this.uploadFile(`images/${uid}/profile.png`, profile.thumb).then(function (response) {
          profile.thumb = response;
          return self.db.collection("profiles").doc(uid).set(profile)
        })
      });
    } else {
      return new Promise(resolve => {
        return this.db.collection("profiles").doc(uid).set(profile)
      });
    }
  }

  updateProfile(uid, profile, files = null):Promise<any> {
    var self = this;
    if (!!profile.thumb && files && files[0]) {
      return new Promise(resolve => {
        this.uploadFile(`images/${uid}/profile.png`, files[0]).then(function (response) {
          profile.thumb = response;
          return self.db.collection("profiles").doc(uid).update(profile)
        })
      });
    } else {
      return new Promise(resolve => {
        return this.db.collection("profiles").doc(uid).update(profile)
      });
    }
  }

  getProfile(uid) {
    var self = this;
    var profile = {
      email: '',
      firstName: '',
      lastName: '',
      thumb: ''
    };
    return new Promise(resolve => {
      this.db.collection('profiles').doc(uid).get().then(function (response) {
        if (!!response.data()) {
          profile = response.data();
        } else {
          self.setProfile(uid, profile);
        }
        console.log(profile);
        resolve(profile);
      }).catch(function(error) {
        resolve(profile);
      });
    });
  }
}
