
// Target first input on document load
$(document).ready(function(){
  $("#name").focus();
});


// Show Other Box When "Other" is selected.  Hide if any other option is selected
$("#title").on("change", function() {
  if($("#title option:checked").val() === "other") {
    $(".other-title").show();
  } else {
    $(".other-title").hide();
  }
});


$("#design").on("change", function(){
  if($("#design option:checked").val() === "js puns") {
    $("#color option").each(function() {
      $("#color option:contains('Puns')").show();
      $("#color option:contains('I')").hide();
    })
  } else if ($("#design option:checked").val() === "heart js") {
    $("#color option").each(function() {
      $("#color option:contains('I')").show();
      $("#color option:contains('Puns')").hide();
    })
  }
});
