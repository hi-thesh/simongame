var userClickedPattern = [];
var gamePattern = [];
const buttonColours = ["red","blue","green","yellow"];
counter = 0;
level = 0;

// SOUND
function playSound(name){
    var colourSounds = new Audio("sounds/"+name+".mp3");
    colourSounds.play();
}

//BUTTON CLICK 
$(".btn").on("click", function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    var chosenColourIndex = (userClickedPattern.length)-1;

    // console.log(userClickedPattern); //temp
    console.log(chosenColourIndex);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(chosenColourIndex);
});

//CLICK ANIMATION
function animatePress(currentColour){
    $('#' +currentColour).addClass("pressed");
    setTimeout(function(){
        $('#' +currentColour).removeClass("pressed");
    },100);
}

//MAIN FUNCTION
function nextSequence(){
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    playSound(randomChosenColour);
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut("fast");
    $('#' + randomChosenColour).fadeIn("fast");
    // console.log(gamePattern); //temp
    $("h1").text("Level "+level);
    level++;
}

//KEYPRESS START GAME
    $(this).keydown(function(){
        if(counter === 0){
            nextSequence();
            counter++;
        }
    });

//CHECK ANSWER LOGIC
function checkAnswer(lastElement){
    var arrayChecker = areEqual(userClickedPattern, gamePattern);
    if (userClickedPattern[lastElement] === gamePattern[lastElement])  
            {
               if (arrayChecker === true)
                    {
                        console.log("success");
                        userClickedPattern = [];
                        setTimeout(nextSequence, 1000);
                    }
                if(arrayChecker === 'false' ) 
                    {
                        gameOver();
                    }   
            } 
    else{
        gameOver();
    }           
}

//ARRAY ELEMENTS CHECK
function areEqual(array1, array2) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element === array2[index]) {
          return true;
        }
  
        return false;
      });
    }
  
    return false;
  }

//GAME OVER
function gameOver(){
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key To Restart");
    counter = 0;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}
