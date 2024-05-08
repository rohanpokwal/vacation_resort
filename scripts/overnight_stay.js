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
  let discountAmount = originalRoomCost * getDiscountRate();
  let costAfterDis = originalRoomCost - discountAmount;
  let taxCost = calculateTax(costAfterDis);
  let totalCost = costAfterDis + taxCost;

  //For the Display
  let numAdult = Number(overnightForm.numAdult.value);
  let numChild = Number(overnightForm.numChild.value);
  let occupants = numAdult + numChild;

  //work for the confirmation number
  let firstName = document.querySelector("#fs-name").value;
  let dateFromUser = overnightForm.checkindate.value;

  let message;
  if (roomType() === "queen" && occupants >= 5) {
    message = `The room you selected will not hold your party.`;
  } else if (roomType() === "king" && occupants > 2) {
    message = `The room you selected will not hold your party.`;
  } else if (roomType() === "multibed" && occupants > 6) {
    message = `The room you selected will not hold your party.`;
  } else {
    message = `
    <div>Original Cost: $ ${originalRoomCost}</div>
    <div>Discount: ${getDiscountRate() * 100} %</div>
    <div>Discounted Room Price: $ ${costAfterDis}</div>
    <div>Tax: ${taxCost}</div>
    <div>Total Cost of the Stay: ${totalCost}</div>
    `;
  }
  //call the function for confirmation Number
  let confirNum = confirmationNumber(
    firstName,
    dateFromUser,
    numNight,
    numAdult,
    numChild
  );

  document.querySelector("#results").innerHTML = message;
  document.querySelector("#confirmationNu").innerHTML = confirNum;
}

//this will get the room price
function getRoomRate() {
  let roomRate = 0;
  let month = getMonth();
  let roomSelectedType = roomType();

  if (roomSelectedType === "multibed" && month >= 6 && month <= 8) {
    roomRate = 350;
  } else if (roomSelectedType === "multibed") {
    roomRate = 210;
  } else if (
    (roomSelectedType === "queen" || roomSelectedType === "king") &&
    month >= 6 &&
    month <= 8
  ) {
    roomRate = 250;
  } else if (roomSelectedType === "queen" || roomSelectedType === "king") {
    roomRate = 150;
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

function confirmationNumber(fname, date, nuStay, nuAdlt, nuKids) {
  let confirmation = "";
  let hypenPosition = date.indexOf("-");
  let lastHypenPosition = date.lastIndexOf("-");
  let monthForConfirmation = date.substring(
    hypenPosition + 1,
    lastHypenPosition
  );
  let yearForConfirmation = date.substring(0, hypenPosition);
  confirmation = `Confirmation: ${fname.substring(
    0,
    3
  )}-${monthForConfirmation}${yearForConfirmation}-${nuStay}:${nuAdlt}:${nuKids}`;

  return confirmation;
}
