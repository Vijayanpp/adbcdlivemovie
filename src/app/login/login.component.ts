import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {firebase} from 'firebase';
import * as Firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
public currentUID;

/**
 * Triggers every time there is a change in the Firebase auth state (i.e. user signed-in or user signed out).
 */



  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }


login()
{
var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
 firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

}

 onAuthStateChanged(user) {
  // // We ignore token refresh events.
  // if (user && this.currentUID === user.uid) {
  //   return;
  // }


  if (user) {
    // this.currentUID = user.uid;
    console.log("login")
    // this.router.navigate(['/addmoviedata']);
    
    this.router.navigate(['/addmoviedata'], { relativeTo: this.route })
   
  } else {
    // Set currentUID to null.
    // this.currentUID = null;
    // Display the splash page where you can sign-in.
   
  }
}

}
