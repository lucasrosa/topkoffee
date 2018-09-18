import React from "react";
import ReactDOM from "react-dom";
import RankBox from "./components/RankBox.js";
import Rank from "./components/Rank.js";

const koffees = [
  { name: "Felipe Braga", count:50},
  { name: "Bruno Blazius", count:2},
  { name: "Katreen Schmidt", count:534},
  { name: "Giuseppe Fachio", count: 56},
  { name: "Mateus Boeing", count:44},
  { name: "Euler Junior", count:20},
  { name: "Lucas Rosa", count:12}
];

// ranking receives koffess prop and renders many RankBoxes
ReactDOM.render(React.createElement(Rank, { ranks: koffees }), document.getElementById("rank"));

// class HelloMessage extends React.Component {
//   render() {
//     return React.createElement(
//       "div",
//       null,
//       "Hello ",
//       this.props.name
//     );
//   }
// };

//ReactDOM.render(React.createElement(RankBox, { name: "Lucas Rosa" }), document.getElementById("index"));
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