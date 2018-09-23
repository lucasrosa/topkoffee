import React from "react";
import ReactDOM from "react-dom";
import Rank from "./components/Rank.js";
import './aws/Configuration';
import Auth from '@aws-amplify/auth';
import RModal from 'rmodal';

// Auth.signUp({
//   username: 'batmanrosaassa@gmail.com',
//   password: 'MyCoolPassword1!',
//   attributes: {
//     name: 'Bruce Wayne'
//   }
// });
// Auth.signOut()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

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

  function countKoffee() {
    //Auth.currentSession().then(session => {console.log("session", session);}).catch(error => console.error(error));
    
    Auth.currentSession()
      .then(session => {
        
        let userToken = session.idToken.jwtToken;
        
        var requestHeaders = new Headers();
        requestHeaders.append('Content-Type', 'application/json');
        requestHeaders.append('Authorization', userToken);

        fetch('https://igbelcdck7.execute-api.us-east-1.amazonaws.com/production/koffee', {
          method: 'POST',
          mode: 'cors',
          headers: requestHeaders
        }).then(response => {
          console.log(response.status == 201);
          if (response.status == 201) {
            koffeeCountedWithSuccess();
          } else {
            failToCountKoffee();
          }
          
        })
        .catch(error => console.error(error));  
      })
      .catch(err => console.log(err));  
  }

  function koffeeCountedWithSuccess(){
    document.getElementById('koffeeCountingSpinner').classList.add("d-none");
    document.getElementById('koffeeSuccessCount').classList.remove("d-none");
    document.getElementById('koffeeSuccessButton').classList.remove("d-none");
  }
  
  function failToCountKoffee(){
    document.getElementById('koffeeCountingSpinner').classList.add("d-none");
    document.getElementById('koffeeFailureCount').classList.remove("d-none");
    document.getElementById('koffeeFailureButton').classList.remove("d-none");
  }

  var koffeeCountModal = new RModal(document.getElementById('koffeeCountModal'), {
    //content: 'Abracadabra',
    afterOpen: function() {
      countKoffee();        
    }
    // , escapeClose: true
  });

  var signupModal = new RModal(document.getElementById('signupModal'), {
  });

  var logInModal = new RModal(document.getElementById('logInModal'), {
    //content: 'Abracadabra',
    beforeOpen: function(next) {
        console.log('beforeOpen');
        next();
    }
    , afterOpen: function() {
        console.log('opened');        
    }

    , beforeClose: function(next) {
        console.log('beforeClose');
        next();
    }
    , afterClose: function() {
        console.log('closed');
    }
    // , bodyClass: 'modal-open'
    // , dialogClass: 'modal-dialog'
    // , dialogOpenClass: 'animated fadeIn'
    // , dialogCloseClass: 'animated fadeOut'

    // , focus: true
    // , focusElements: ['input.form-control', 'textarea', 'button.btn-primary']

    // , escapeClose: true
  });

  document.addEventListener('keydown', function(ev) {
    logInModal.keydown(ev);
  }, false);

  document.getElementById('showModal').addEventListener("click", function(ev) {
      ev.preventDefault();
      Auth.currentAuthenticatedUser()
      .then(user => koffeeCountModal.open())
      .catch(err => logInModal.open());
      
  }, false);

  function disableButton(_document, id){
    _document.getElementById(id).classList.add("disable");
    _document.getElementById(id).setAttribute("disabled","");
  }

  function enableButton(_document, id){
    _document.getElementById(id).classList.remove("disable");
    _document.getElementById(id).removeAttribute("disabled");
  }

  function disableInput(id) {
    document.getElementById(id).setAttribute("disabled", "");
  }

  function enableInput(id) {
    document.getElementById(id).removeAttribute("disabled");
  }

  Auth.currentAuthenticatedUser()
      .then(user => {
        document.getElementById('signOutButton').classList.remove('d-none');
      })
      .catch(err => console.log("User not signed in."));

  // Log out button
  document.getElementById('signOutButton').addEventListener("click", function(ev) {
    ev.preventDefault();
    Auth.signOut()
      .then(data => document.getElementById('signOutButton').classList.add('d-none'))
      .catch(err => console.log(err));
  });

  // Log in button
  document.getElementById('loginButton').addEventListener("click", function(ev) {
    ev.preventDefault();
    // Disable button
    document.getElementById('loginButton').innerHTML = '<span class="fa fa-spinner fa-spin checked" style="font-size: 17px;"></span>';
    disableButton(document, 'loginButton');
    disableButton(document, 'cancelLoginButton');

    disableInput('loginEmail');
    disableInput('loginPassword');

    let username = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    
    
    Auth.signIn(username, password)
      .then(success => {
        console.log('successful sign in');
        document.getElementById('signOutButton').classList.remove('d-none');
        enableButton(document, 'loginButton');
        enableButton(document, 'cancelLoginButton');
        enableInput('loginEmail');
        enableInput('loginPassword');
        window.logInModal.close();
        document.getElementById('loginButton').innerHTML = "Log in";
        document.getElementById('loginAlertMessage').innerHTML = "";
        document.getElementById('loginAlertMessage').classList.add("d-none");
        setTimeout(function(){ 
          koffeeCountModal.open();
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        enableButton(document, 'loginButton');
        enableInput('loginEmail');
        enableInput('loginPassword');
        enableButton(document, 'cancelLoginButton');
        document.getElementById('loginButton').innerHTML = "Log in";
        document.getElementById('loginAlertMessage').innerHTML = err.message;
        document.getElementById('loginAlertMessage').classList.remove("d-none");
        //window.logInModal.close();
      });
  }, false);


  // Sign up button
  document.getElementById('signupButton').addEventListener("click", function(ev) {
    ev.preventDefault();
    // Disable button
    document.getElementById('signupButton').innerHTML = '<span class="fa fa-spinner fa-spin checked" style="font-size: 17px;"></span>';
    disableButton(document, 'signupButton');
    disableButton(document, 'cancelSignupButton');

    disableInput('signupEmail');
    disableInput('signupPassword');
    disableInput('signupName');

    let username = document.getElementById('signupEmail').value;
    let password = document.getElementById('signupPassword').value;
    let name = document.getElementById('signupName').value;
    
    
    Auth.signUp(
      {
        username: username,
        password: password,
        attributes: {
          name: name
        }
      }
    )
      .then(success => {
        console.log('successful signup in');
        enableButton(document, 'signupButton');
        enableButton(document, 'cancelSignupButton');
        enableInput('signupName');
        enableInput('signupEmail');
        enableInput('signupPassword');
        window.signupModal.close();
        document.getElementById('signupButton').innerHTML = "Sign up";
        document.getElementById('signupAlertMessage').innerHTML = "";
        document.getElementById('signupAlertMessage').classList.add("d-none");
        setTimeout(function(){ 
          logInModal.open();
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        enableButton(document, 'signupButton');
        enableInput('signupName');
        enableInput('signupEmail');
        enableInput('signupPassword');
        enableButton(document, 'cancelSignupButton');
        document.getElementById('signupButton').innerHTML = "Sign up";
        document.getElementById('signupAlertMessage').innerHTML = err.message;
        document.getElementById('signupAlertMessage').classList.remove("d-none");
        //window.logInModal.close();
      });
  }, false);

  window.signupModal = signupModal;
  window.logInModal = logInModal;
  window.koffeeCountModal = koffeeCountModal;
}
