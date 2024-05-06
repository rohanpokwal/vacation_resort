"use strict";

window.onload = function () {
  let overnightForm = document.querySelector("#overnightForm");

  overnightForm.addEventListener("submit", calculateOvernightStay);
};

//Calculate Overnight stay
function calculateOvernightStay(event) {
  //keep form from submitting and refreshing the page
  event.preventDefault();

  //targeting the form elements from event in this case is submit button
  let overnightForm = event.target;

  //Calculating Everything
  let numNight = overnightForm.numNight.value;
  let originalRoomCost = getRoomRate() * numNight;
  let discountAmount = getRoomRate() * getDiscountRate();
  let costAfterDis = getRoomRate() - discountAmount;
  let taxCost = calculateTax(costAfterDis);
  let totalCost = originalRoomCost - discountAmount + taxCost;

  //print the Message
  let numAdult = Number(overnightForm.numAdult.value);
  let numChild = Number(overnightForm.numChild.value);
  let firstName = document.querySelector("#fs-name").value;
  let occupants = numAdult + numChild;
  console.log(occupants);
  let message;
  if (roomType() === "queen" && occupants >= 5) {
    message = `The room you selected will not hold your party.`;
  } else if (roomType() === "king" && occupants >= 2) {
    message = `The room you selected will not hold your party.`;
  } else if (roomType() === "multibed" && occupants >= 6) {
    message = `The room you selected will not hold your party.`;
  } else {
    message = `
    <div>Estimate Room Price: ${totalCost}</div>
    <div>Confirmation: ${firstName.substr(0, 4)}</div>

    `;
  }

  document.querySelector("#results").innerHTML = message;
}

//this will get the room price
function getRoomRate() {
  let roomRate = 0;
  let month = getMonth();
  let roomSelectedType = roomType();

  if (
    (roomSelectedType === "queen" || roomSelectedType === "king") &&
    month <= 8
  ) {
    roomRate = 250;
  } else if (
    (roomSelectedType === "queen" || roomSelectedType === "king") &&
    month > 8
  ) {
    roomRate = 150;
  } else if (roomSelectedType === "multibed" && month <= 8) {
    roomRate = 350;
  } else {
    roomRate = 210;
  }

  return roomRate;
}

//this will get the discount
function getDiscountRate() {
  let discountRate = 0;
  let seniorDis = document.querySelector("#seniorDis");
  let militaryDis = document.querySelector("#militaryDis");

  if (seniorDis.checked) {
    discountRate = 0.1;
  } else if (militaryDis.checked) {
    discountRate = 0.2;
  }
  return discountRate;
}

//this will get the tax rate
function calculateTax(afterDisTotal) {
  let tax = afterDisTotal * 0.12;
  return tax;
}

function getMonth() {
  let userdate = document.querySelector("#checkin-date").value;
  let date = new Date(userdate);
  let month = date.getMonth() + 1;
  return month;
}

function roomType() {
  let roomType = "";
  let roomTypeQueen = document.querySelector("#queen");
  let roomTypeKing = document.querySelector("#king");

  if (roomTypeQueen.checked) {
    roomType = "queen";
  } else if (roomTypeKing.checked) {
    roomType = "king";
  } else {
    roomType = "multibed";
  }
  return roomType;
}
