// getting all required elemwnts 

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list =document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec"); 
const timeline = quiz_box.querySelector("header .time_line"); 

// if start quiz button clicked
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); // show the info box
}
// if exit btn button clicked
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
}
// if Continue btn button clicked
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.add("activeQuiz"); //show the quiz box
    showQuestion(0); // to show question
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let counter;
let counterLine;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult");
    que_count = 0;
    que_numb = 1;
    timeValue = 15;
    widthValue = 0;
    userScore = 0;
    showQuestion(que_count); 
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    next_btn.style.display="none";
   
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
};

// if next butten clicked 
next_btn.onclick = ()=>{
   if(que_count < questions.length - 1){
    que_count++;
    que_numb++;
    showQuestion(que_count); 
    queCounter(que_numb);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    next_btn.style.display="none";
   }else{
    console.log("question compleet");
    showResultBox();
   }
}

// getting question and option from array
function showQuestion(index){
    const que_text =document.querySelector(".quiz_text");
    
    let que_tag = "<span>" + questions[index].numb +'.'+  questions[index].question +"</span>" 
    let option_tag = '<div class="option">'+ questions[index].Options[0]+'<span></span></div>'
                    +'<div class="option">'+ questions[index].Options[1]+'<span></span></div>'
                    +'<div class="option">'+ questions[index].Options[2]+'<span></span></div>'
                    +'<div class="option">'+ questions[index].Options[3]+'<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option")
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickiconTag ='<div class="icon tick"><i class="fas fa-check"></i>';
let crossiconTag ='<div class="icon cross"><i class="fas fa-times"></i>';

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine); 
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    const alloption = option_list.children.length;
    

    if(userAns == correctAns){
        userScore += 1 ;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("correct answor");
        answer.insertAdjacentHTML("beforeend", tickiconTag);
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossiconTag);
        console.log("incorrect answor");

        // if answor is 9incorect autiomatic select correct answor 
        for(i=0; i < alloption; i++){
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
                option_list.children[i].insertAdjacentHTML("beforeend", tickiconTag);
            }
        }
    }

// onse user selected diable all option
for (let i = 0; i < alloption; i++) {
    option_list.children[i].classList.add("disabled");

    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo"); //hide the info box
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const ScoreText = result_box.querySelector(".score_text");
    if (userScore > 3){
        let ScoreTag = "<span>and Congrats!, you got  <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        ScoreText.innerHTML = ScoreTag;
    }
        else if (userScore > 1){
        let ScoreTag = "<span>and nice , you got  <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        ScoreText.innerHTML = ScoreTag;
    }
    else {
        let ScoreTag = "<span>and sorry, you got only <p>" + userScore + "</p> out of <p>" + questions.length + "</p></span>";
        ScoreText.innerHTML = ScoreTag;
    }
    

}
 function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 9){
            let addZiro = timeCount.textContent;
            timeCount.textContent = "0" + addZiro;
        }    
        if(time < 0){
            clearInterval(counter);
            time_text.textContent = "Time off";
        }   
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeline.style.width = time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }
    }
}

function queCounter(index){
    const bottom_question_counter = document.querySelector(".total_que");
 let totalQuestionCount = "<span><p>"+ index +"</p> of <p>" + questions.length + "</p>Question</span>";
 bottom_question_counter.innerHTML = totalQuestionCount;
};
