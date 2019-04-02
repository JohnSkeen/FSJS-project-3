// Total Cost variable
let totalCost = 0;

// Form Validation Variables
let errorName = false;
let errorMail = false;
let errorSelected = false;
let errorCredit = false;

// Form Validation Regex
const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Credit Validation Variables
const ccRegex = /^[0-9]{13,16}$/;
const ccZip = /^[0-9]{5}(-[0-9]{4})?$/;
const cvv = /^[0-9]{3}$/;
let errorCc = false;
let errorZip = false;
let errorCvv = false;

// Target first input on document load
$(document).ready(function(){
  $("#name").focus();
  $("#colors-js-puns").hide();
  $(".activities").append("<p id='totalCost'>Total Cost: $" + totalCost + ".</p>");
  $("#totalCost").hide();
  $(".activities").append("<p id='notSelected'>Please select at least one activity.</p>");
  $("#notSelected").hide();
  $("#credit-card").append("<p id='creditWarning'>Please enter a credit card number.</p>");
  $("#creditWarning").hide();
  $("#credit-card").append("<p id='creditWarningDigits'>Please ensure card number is between 13 and 16 digits.</p>");
  $("#creditWarningDigits").hide();
  $("#payPal").hide();
  $("#bitCoin").hide();
  $("#payment option[value='select_method']").hide();
  $("#payment option[value='credit card']").attr("selected", true)
});


// Show Other Box When "Other" is selected.  Hide if any other option is selected
$("#title").on("change", function() {
  if($("#title option:checked").val() === "other") {
    $(".other-title").show();
  } else {
    $(".other-title").hide();
  }
});

// Show color options based on tshirt selection
$("#design").on("change", function(){
  $("#colors-js-puns").fadeIn(250);
  $("#color option").each(function() {
    if($(this).parent().is("span")) {
      $(this).unwrap();
    }
  })
  if($("#design option:checked").val() === "js puns") {
    $("#color option:contains('Puns')").wrap(`<span/>`);
  } else if ($("#design option:checked").val() === "heart js") {
    $("#color option:contains('I')").wrap(`<span/>`);
  }
});

// Ensure activities that occur at the same time can't be double selected and add cost
// for 9am - 12pm activities
$("label:contains('9am-12pm') input").on("change", function(){
  if ($(this).is(':checked')) {
    $("label:contains('9am-12pm') input").not(this).prop("disabled", true);
    $("label:contains('9am-12pm') input").not(this).parent().css("color", "grey");
    $("label:contains('9am-12pm') input").not(this).parent().css("text-decoration", "line-through");
    totalCost += 100;
  } else {
    $("label:contains('9am-12pm') input").not(this).prop("disabled", false);
    $("label:contains('9am-12pm') input").not(this).parent().css("color", "black");
    $("label:contains('9am-12pm') input").not(this).parent().css("text-decoration", "none");
    totalCost -= 100;
  }
});

// for 1pm - 4pm activities
$("label:contains('1pm-4pm') input").on("change", function(){
  if ($(this).is(':checked')) {
    $("label:contains('1pm-4pm') input").not(this).prop("disabled", true);
    $("label:contains('1pm-4pm') input").not(this).parent().css("color", "grey");
    $("label:contains('1pm-4pm') input").not(this).parent().css("text-decoration", "line-through");
    totalCost += 100;
  } else {
    $("label:contains('1pm-4pm') input").not(this).prop("disabled", false);
    $("label:contains('1pm-4pm') input").not(this).parent().css("color", "black");
    $("label:contains('1pm-4pm') input").not(this).parent().css("text-decoration", "none");
    totalCost -= 100;
  }
});

// Create value for main conference event
$("label:contains('Main') input").on("change", function(){
  if($(this).is(':checked')) {
    totalCost += 200;
  } else {
    totalCost -= 200;
  }
});

// Display total cost when an activity is selected and dynamically update cost
$(".activities label input").on("change", function(){
  $("#totalCost").show();
  $("#notSelected").hide();
  $("#totalCost").text("Total Cost: $" + totalCost + ".")
});

// Display payment sections based on the payment option chosen in the select menu
$("#payment").on("change", function(){
  if($("#payment option:checked").val() === "credit card") {
    $("#credit-card").show();
    $("#payPal").hide();
    $("#bitCoin").hide();
    errorCredit = false;
  } else if ($("#payment option:checked").val() === "paypal") {
    $("#credit-card").hide();
    $("#payPal").show();
    $("#bitCoin").hide();
    errorCredit = true;
  } else if ($("#payment option:checked").val() === "bitcoin") {
    $("#credit-card").hide();
    $("#payPal").hide();
    $("#bitCoin").show();
    errorCredit = true;
  }
});

// Form Validation

// Function to check name and change parameters based on compliancy
function checkName() {
  if(nameRegex.test($("#name").val()) === true) {
    errorName = true;
    $("#name").css("border-color", "#c1deeb");
  } else {
    $("#name").css("border-color", "red");
    errorName = false;
  }
}

// Function to check email and change parameters based on compliancy
function checkMail() {
  if(mailRegex.test($("#mail").val()) === true) {
    $("#mail").css("border-color", "#c1deeb");
    errorMail = true;
  } else {
    $("#mail").css("border-color", "red");
    errorMail = false;
  }
}

// Function to check Credit Card and change parameters based on compliancy
function checkCc() {
  if(ccRegex.test($("#cc-num").val()) === true) {
    $("#creditWarning").hide();
    $("#creditWarningDigits").hide();
    $("#cc-num").css("border-color", "#c1deeb");
    errorCc = true;
  } else if ($("#cc-num").val() === "") {
    $("#creditWarning").fadeIn(1000);
    $("#creditWarningDigits").hide();
    $("#cc-num").css("border-color", "red");
    errorCc = false;
  } else {
    $("#creditWarning").hide();
    $("#creditWarningDigits").fadeIn(1000);
    $("#cc-num").css("border-color", "red");
    errorCc = false;
  }
  creditConfirmed();
}

// Function to check Zip and change parameters based on compliancy
function checkZip() {
  if(ccZip.test($("#zip").val()) === true) {
    $("#zip").css("border-color", "#c1deeb");
    errorZip = true;
  } else {
    $("#zip").css("border-color", "red");
    errorZip = false;
  }
  creditConfirmed();
}

// Function to check Cvv and change parameters based on compliancy
function checkCvv() {
  if(cvv.test($("#cvv").val()) === true) {
    $("#cvv").css("border-color", "#c1deeb");
    errorCvv = true;
  } else {
    $("#cvv").css("border-color", "red");
    errorCvv = false;
  }
  creditConfirmed();
}

// Validate ALl Credit Information is Input
function creditConfirmed() {
  if(errorCc && errorZip && errorCvv) {
    errorCredit = true;
  } else {
    errorCredit = false;
  }
}

// Function to validate form fields on focusout
$(function(){

  // Validation of name on focus out
  $("#name").focusout(function(){
    checkName();
  });

  // Validation of email on focus out
  $("#mail").focusout(function(){
    checkMail();
  });

  // Conditional statement to check if credit is selected and if so that all parts are filled out
  if($("#payment option:checked").val() === "credit card") {

    // Validate CC number
    $("#cc-num").focusout(function(){
      checkCc();
    });

    // Validate zip code
    $("#zip").focusout(function(){
      checkZip();
    });

    // Validate CVV
    $("#cvv").focusout(function(){
      checkCvv();
    });
  }
});

// Function ensuring at least one activity is selected
function selectSomething(){
  if ($(".activities input[type=checkbox]:checked").length > 0) {
    errorSelected = true;
    $("#notSelected").hide();
  } else {
    errorSelected = false;
    $("#notSelected").show();
  }
}

// Form controlling submit - ensuring all fields are completed prior to submission
$("form").submit(function(event){
    selectSomething();
    checkName();
    checkMail();

    if($("#payment option:checked").val() === "credit card") {
      checkCc();
      checkZip();
      checkCvv();
    }

    if(errorCredit && errorName && errorSelected && errorMail == fl) {

    } else {
      event.preventDefault();
    }
});

console.log($("#cc-num input").val());
