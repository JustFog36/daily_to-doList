// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function() {
    // Display the current date at the top of the page
    var currentDay = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(currentDay);
    // Loop through each time block
    $(".time-block").each(function() {
      var timeBlock = $(this);
      var currentTime = dayjs().hour();
      debugger
      var blockHour = parseInt(timeBlock.attr("id").split("-")[1]);
  
      // Compare the block hour to the current hour
      if (blockHour < currentTime) {
        timeBlock.removeClass("present future").addClass("past");
      } else if (blockHour === currentTime) {
        timeBlock.removeClass("past future").addClass("present");
      } else {
        timeBlock.removeClass("past present").addClass("future");
      }
  
      // Retrieve saved data from local storage
      var savedData = localStorage.getItem(timeBlock.attr("id"));
  
      // Populate the textarea with saved data
      if (savedData !== null) {
        timeBlock.find(".description").val(savedData);
      }
  
      // Save data to local storage when the save button is clicked
      timeBlock.find(".saveBtn").on("click", function() {
        var text = timeBlock.find(".description").val();
        localStorage.setItem(timeBlock.attr("id"), text);
      });
    });
  });