import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'

@Component({
  selector: 'app-createmoviedata',
  templateUrl: './createmoviedata.component.html',
  styleUrls: ['./createmoviedata.component.css']
})
export class CreatemoviedataComponent implements OnInit {
	public title;
	public message;
    private postForm: FormGroup;
    private listeningFirebaseRefs = [];
    private titleData;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

        this.postForm = this.fb.group({
        title: [this.title, [Validators.required, Validators.minLength(5)]],
        message: [this.message, [Validators.required, Validators.minLength(5)]]
       
      
    }) 
  }



  writeNewPost(uid, username, picture, title, body) {
  // A post entry.
 
  var postData = {
    author: username,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
};


newPostForCurrentUser(title, text) {
  // [START single_value_read]
  var self=this
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
    var username = snapshot.val().username;   // [START_EXCLUDE]

    return self.writeNewPost(firebase.auth().currentUser.uid, username,
        firebase.auth().currentUser.photoURL,
        title, text);
    // [END_EXCLUDE]
  });
  // [END single_value_read]
};



login()
{
var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(user=>
 {
 	console.log("login")
    // this.router.navigate(['/addmoviedata']);
    this.submitPost(this.postForm);
    this.startDatabaseQueries();

 }).catch((error) => {
     
    });

};



startDatabaseQueries() {
  // [START my_top_posts_query]
  var myUserId = firebase.auth().currentUser.uid;
  var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  // [END my_top_posts_query]
  // [START recent_posts_query]
  var recentPostsRef = firebase.database().ref('posts').limitToLast(100);
  // [END recent_posts_query]
  var userPostsRef = firebase.database().ref('user-posts/' + myUserId);

  var fetchPosts = function(postsRef) {
    postsRef.on('child_added', function(data) {
     console.log("k")

      this.titleData=data.val().title || 'Anonymous';
          
    });
    postsRef.on('child_changed', function(data) {	
    	console.log('kkkkk')
		this.titleData=data.val().title;
    });
    postsRef.on('child_removed', function(data) {
    	console.log('kdfkdjfkdfj');
		this.titleData=data.val().title ;
    });
  };

  // Fetching and displaying all posts of each sections.
  fetchPosts(topUserPostsRef);
  fetchPosts(recentPostsRef);
  fetchPosts(userPostsRef);

  // Keep track of all Firebase refs we are listening to.
  this.listeningFirebaseRefs.push(topUserPostsRef);
  this.listeningFirebaseRefs.push(recentPostsRef);
  this.listeningFirebaseRefs.push(userPostsRef);
}

//  onAuthStateChanged(user) {
//    // // We ignore token refresh events.
//   // if (user && this.currentUID === user.uid) {
//   //   return;
//   // }
// var self=this;

//   if (user) {
//     // this.currentUID = user.uid;
//     console.log("login")
//     // this.router.navigate(['/addmoviedata']);
//     // self.submitPost();
    
   
//   } else {
//     // Set currentUID to null.
//     // this.currentUID = null;
//     // Display the splash page where you can sign-in.
   
//   }
// }

submitPost(model) {
    
    var text =model.value.title;
    var title =model.value.message;
    console.log(text);
    console.log(title);
    if (text && title) {
      this.newPostForCurrentUser(title, text).then(function() {
      // console.log("posted");
      });
      this.title= '';
     this.message = '';
    }
  };



}
