import React from "react";
import ReactDOM from "react-dom";
import Rank from "./components/Rank.js";
import './aws/Configuration';
import Auth from '@aws-amplify/auth';

Auth.currentAuthenticatedUser()
    .then(user => console.log("We have this user signed:", user))
    .catch(err => console.log("Sadly nobody is signed in :( :", err));

// Auth.signUp({
//   username: 'batmanrosaassa@gmail.com',
//   password: 'MyCoolPassword1!',
//   attributes: {
//     name: 'Bruce Wayne'
//   }
// });


// let username = "lucas.furlani.rosa@gmail.com";
// let password = "abc123987";
// Auth.signIn(username, password)
//   .then(success => console.log('successful sign in'))
//   .catch(err => console.log(err));

var koffees = [
  { name: "Felipe Braga", count:50},
  { name: "Bruno Blazius", count:2},
  { name: "Katreen Schmidt", count:534},
  { name: "Giuseppe Fachio", count: 56},
  { name: "Mateus Boeing", count:44},
  { name: "Euler Junior", count:20},
  { name: "Lucas Rosa", count:12}
];

// Ranking receives koffees prop and renders many RankBoxes
ReactDOM.render(React.createElement(Rank, { ranks: koffees }), document.getElementById("rank"));


// Menu "animation"
window.onload = function() {
  window.addEventListener("scroll", function (event) {
    let element = document.getElementById("header");
    if (this.scrollY > 100) {
      element.classList.add("header-scrolled");
    } else {
      element.classList.remove("header-scrolled");
    }
  }); 
}