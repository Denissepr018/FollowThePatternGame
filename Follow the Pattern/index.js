// alert("active"); // test to conect JS
// $("h1").css("color", "red"); //test if JQuery was liked propertly

// Denisse Perez Ramirez - 2020 Web Development BootCamp JQuery Libraries

//ALL GENERAL VARIBLES -----------------------------------------

var buttonColours = ["red", "blue","green", "yellow"]; // array of colours for the buttons

var gamePattern = [];  //Array to keep track of colour chosen randomly

var userClickedPattern = []; // Array  to keep track of the actual buttons pressed

var level = 0; // level of game always starts at Zero

var started = false; //default start at state false because no key has been pressed

$(document).keypress(function(){

    if(!started)
    {   
    
     $("#level-title").text("Level" + level);
     nextSequence();// method called to start game after any key pressed
     started = true; // loop around everytime a level has started change state if game stated
    }    
});

$(".btn").click(function()
{ // Function to keep track of clicked area.

    var userChosenColour = $(this).attr("id"); // per each colour id clicked 
    userClickedPattern.push(userChosenColour); // add into stack the colour pressed
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); //answercheck call function

});

// Check answer and move alone to increase level if answe are correct
function checkAnswer(currentLevel) 
{

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){ // balance ccheck is the clicked pattern  == to the game patthern
        setTimeout(function () { // set the time until next sequence gets played
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong"); // alert 
      $("body").addClass("game-over"); // alerts 
      $("#level-title").text("Game Over, Press Any Key to Reset"); // Game alert game over

      setTimeout(function () {
        $("body").removeClass("game-over");// Alerts
      }, 200);

      startOver(); // If any key pressed start game from over. 
    }
}

function playSound(name) 
{
    var audio = new Audio("sounds/" + name + ".mp3"); // addition of a sound when game is being played
    audio.play();

}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed"); // boxes willbe animated in other to show where to press 

    setTimeout(function(){
      
     $("#" + currentColour).removeClass("pressed");   

    }, 100);
}

function startOver() // check if patthern was correctly followed if violarted state game back to false until new key pressed
{
    level = 0;
    gamePattern = [];
    started = false;
  }
 
function nextSequence() // level and sequence track to increase level and game dificulty. 
{ // next sequence tracker
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level); 

    var randomNumber = Math.floor(Math.random()*4);  // randomly select a number from 0 to 4
    var randomChosenColour = buttonColours[randomNumber]// assign the random number to a colour into the array
    
    gamePattern.push(randomChosenColour); // keep track of the random chosen color 

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // per each id clicked fade in and out when pressed.

    playSound(randomChosenColour);

    

}