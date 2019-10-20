
var quiz = 0, test_status, initials, choice, choices, chA, chB, chC, chD, question, correct = 0;
var pos = 0;
var resultEl = document.getElementById("result");
var totalScore = 0;
var finalIntEl = document.getElementById("finalInt");
var intStorage = localStorage.getItem("intStorage");
var score = localStorage.getItem("score");
var highscoreDisplay = document.getElementById("grade");
var timeEl = document.querySelector("#timer");
let initialsEl = document.getElementById("initials");



// create variable of a multidimensional array
var questions = [
        ["The condition in an if / else statement is enclosed within ____.", "Quotes", "Curly brackets", "Parentheses", "Square brackets", 'C'],
        ["Commonly used data types DO NOT include:", "Strings", "Booleans", "Numbers", "Alerts", 'D'],
        ["The BODY Tag is usually used after ____.", "HTML Tag", "p Tag", "title Tag", "Math", 'A'],
        ["A much better approach to establish the base URL is to use the ______ element.", "img", "BODY", "header", "head", 'D'],
        ["Correct HTML Tag for the largest heading is:", "h6", "h1", "heading", "head", 'B'],

];

var secondsLeft = 75;
function setTime(){
    var timerInterval = setInterval(() => {
        secondsLeft--;
        timeEl.textContent = secondsLeft;
        if(secondsLeft < 1){
            clearInterval(timerInterval);
            timesUp();
        }
    }, 1000);

}

function _(x){
    return document.getElementById(x);
}

function renderQuestion(){
    
    //setTime();

    quiz = _("quiz");
    
    if(pos >= questions.length){
        quiz.innerHTML = "<h2> You got " + correct + " of " + questions.length + " questions correct<br><br><br> Your final score is: " + totalScore + ".</h2><hr><br>Enter initials: " + "<input type='text' id='initials' required minlength='1' maxlength='3'><button  id='submitInitial' style='background-color: lightseagreen; color: white;'> Submit </button>";
        let initialsEl = document.getElementById("initials");
        
        const submitInitBtn = document.getElementById("submitInitial");

            submitInitBtn.addEventListener("click", function(event){
                event.preventDefault();
                var userIn = initialsEl.value;
                if (initialsEl.value == '' || initialsEl.value == null){
                    resultEl.innerHTML = "<p style= 'color: red;'>Invalid input. Please enter your initials!</p>";
                }
                else{
                window.location = "final.html";
                localStorage.setItem('userInitial', JSON.stringify(userIn));
                highScore();
                }
            });


            _("test_status").innerHTML = "Quiz Completed!";
            pos = 0;
            correct = 0;
            resultEl.innerHTML = " ";
            return false; // to make sure this function is not going to continue after this line 
    }


    _("test_status").innerHTML = "Question " + (pos+1) + " of " + questions.length + "<br><br>";
    question = questions[pos][0];
    chA = questions[pos][1];
    chB = questions[pos][2];
    chC = questions[pos][3];
    chD = questions[pos][4];

    quiz.innerHTML = "<h3>" + question + "</h3>";
    quiz.innerHTML += "<input type='radio' name='choices' value='A'> "+ chA + "<br>";
    quiz.innerHTML += "<input type='radio' name='choices' value='B'> "+ chB + "<br>";
    quiz.innerHTML += "<input type='radio' name='choices' value='C'> "+ chC + "<br>";
    quiz.innerHTML += "<input type='radio' name='choices' value='D'> "+ chD + "<br><br>";
    // adding a button element to submit answer
    quiz.innerHTML += "<button onclick='checkAnswer()' style= 'background-color: lightseagreen; color: white; border-color: lightseagreen'> Submit Answer </button>" + "<br><br><hr>";
    
    
}

function checkAnswer(){
    
    choices = document.getElementsByName("choices"); // choices is an array of A, B, C, D values
    for (var i = 0; i < choices.length; i++) {
        if(choices[i].checked){
            choice = choices[i].value;
        }   
    }
    if(choice == questions[pos][5]){
        resultEl.innerHTML = "<p style='color: green;'>Correct!</p>";
        correct++;
        totalScore = totalScore + 5;
    }
    else{
        totalScore = 0;
        resultEl.innerHTML = "<p style='color: red;'>Wrong!</p>";
        console.log(totalScore);
        secondsLeft = secondsLeft - 10;
    }
    localStorage.setItem('totalScore', JSON.stringify(totalScore));
    pos++;
    renderQuestion();
}
function timesUp(){

    _("test_status").innerHTML = "<h1> Time's Up! </h1><br>";
    // quiz.innerHTML = "<h2> You got " + correct + " of " + questions.length + " questions correct<br><br><br> Your final score is: " + totalScore + ".</h2><hr><br>Enter initials: " + "<input type='text' id='initials' required minlength='1' maxlength='3'><button  id='submitInitial' style='background-color: lightseagreen; color: white;'> Submit </button>";

    resultEl.innerHTML = "";
    let initialsEl = document.getElementById("initials");
    const submitInitBtn = document.getElementById("submitInitial");

    submitInitBtn.addEventListener("click", function(event){
        event.preventDefault();
        var userIn = initialsEl.value;
        if (initialsEl.value == '' || initialsEl.value == null){
            resultEl.innerHTML = "<p style= 'color: red;'>Invalid input. Please enter your initials!</p>";
        }
        else{
        window.location = "final.html";
        localStorage.setItem('userInitial', JSON.stringify(userIn));
        highScore();
        }
    });



}
function highScore(){

    var clrBtn = _("clearHighscores");
    
    var retrieveInitials = JSON.parse(localStorage.getItem('userInitial'));
    var retrieveScore = localStorage.getItem('totalScore');
    retrieveScore.innerHTML = totalScore;
    console.log(retrieveScore);
    console.log(retrieveInitials);
    
    highscoreDisplay.innerHTML += retrieveInitials + ": " + retrieveScore;

    // renderGrades();

    clrBtn.addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById("grade").innerHTML = "";
        
    });
}
// function renderGrades(){
 
//     var arr = [];
//     for (var i = 0; i < 10; i++){
//         arr.push(highscoreDisplay + i);
//         var li = document.createElement("li");
//         li.textContent = highscoreDisplay;
//        highscoreDisplay += li;
//     }

// }


window.addEventListener("load", highScore, false);
window.addEventListener("load", function() {
    setTime()
    renderQuestion()
});

