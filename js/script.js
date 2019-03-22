
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
    $("#color").val("tomato").hide();
  } else if ($("#design option:checked").val() === "heart js") {
    console.log($("#color option").val());
  }

});
