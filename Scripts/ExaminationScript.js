//import * as data from "../../questions.json" assert { type: "json" };

import getData from "./api.js"; //to make api reusable

var question = document.getElementById("question"); //to hold question place

var answers = document.getElementById("answers"); //to hold answer  place

var pageNumber = document.getElementById("pageNumber"); // to hold page number

var marked = document.getElementsByClassName("marked"); // to hold markers

var timer = document.getElementById("timer"); // to hold time place

var time = 50; // to put time in min

var counter = -1; // to handle swapping between page

var URL = "http://127.0.0.1:5500/questions.json"; // you could put any url of any exam like in the json object

var questions = await getData(URL); // function take URL and return promise hold array of questions and answers

var degree = 0; // variable to sum degrees of student

/**
 * function to make random array by sort function
 *
 */
questions = questions.sort(() => 5 - Math.random() * 10);

pageNumber.innerHTML = counter + 2; // to handle page number by the counter and we add +2 because my counter start from -1 and  my page start from number one

window.next = next; // i make every thing global bec i use module

timer.innerHTML = `${time} Minutes remaining `;

console.table(questions);
next();

/**
 * timer function
 * every one min the timer will fire to dec by one min
 *
 */
setInterval(() => {
  time--;
  timer.innerHTML = `${time} Minutes remaining `;
  if (time == 0) {
    finish(false); // calling function finish to redirect the page  with parm false to  make page understand timeout
  }
}, 10000);

function next() {
  // to go up one page

  if (counter >= questions.length - 1) {
    //that condition will help us stop when reach the last ques
    return;
  }

  showExam("up"); // this function with pram up mange page to go next 
}

window.Previous = Previous;

function Previous() {
  if (counter <= 0) {
    return;
  }
  showExam("down"); // this function with pram down mange page to go back 
}

window.passValue = passValue;

function passValue(i, x, z) {
  sessionStorage.setItem(`${z}`, `${i.value}`); ///
  if (x == questions[z].rightOne) {
    questions[z].isRight = true;
  } else {
    questions[z].isRight = false;
  }
}
window.mark = mark;
function mark() {
  let bookmark = document.getElementsByClassName("bookmarks")[0];
  let array = Array.from(marked); //
  var x = array.some((e) => {
    console.log(e.getAttribute("value"));

    return e.getAttribute("value") == counter;
  });
  //console.log(x);
  if (!x) {
    array = array.sort((e) => e.getAttribute("value"));
    bookmark.innerHTML += `<div class="marked" value="${counter}" onclick=" returnMark(this)" >mark-Question ${
      +counter + 1
    } <span class="trash"  onclick="remove(this)"><i class="fa fa-trash" aria-hidden="true"></i> <span>
    </div>`;
  }
}
window.returnMark = returnMark;
function returnMark(x) {
  counter = x.getAttribute("value");
  //console.log(counter);
  showExam(counter);
  pageNumber.innerHTML = +x.getAttribute("value") + 1;
  //x.remove();
}

window.remove = remove;

function remove(x) {
  x.parentElement.remove();
  console.dir(x);
}

function calcDegree() {
  var arr = questions.filter((e) => e.isRight);
  for (var i = 0; i < arr.length; i++) {
    degree = questions[i].Degree * arr.length;
    console.log(degree);
  }
}

function showExam(x = "up") {
  if (x == "up") {
    counter++;
  } else if (x == "down") {
    --counter;
  } else {
    counter = x;
  }
  pageNumber.innerHTML = counter + 1;
  answers.innerHTML = "";
  question.innerHTML = questions[counter].q;

  questions[counter].answers.map((e, i) => {
    answers.innerHTML += `<li><div class="answer"> ${e} <input class="form-check-input" name="answers" type="radio" value="${e}" onclick="passValue(this,${i},${counter})"></div></li>`;
  });
  handleAnsweredQuestions();
}

function handleAnsweredQuestions() {
  var keys = Object.keys(sessionStorage);
  for (let i = 0; i < keys.length; i++) {
    if (keys[i] == `${counter}`) {
      var input = document.getElementsByName("answers");
      for (let i = 0; i < input.length; i++) {
        if (input[i].value == sessionStorage.getItem(`${counter}`)) {
          input[i].checked = true;
        }
      }
    }
  }
}

window.finish = finish;
function finish(time = true) {
  calcDegree();
  localStorage.setItem("Grades", degree);
  localStorage.setItem("TIME", time);
  window.location.replace(
    "http://127.0.0.1:5500/Screens/GradesPage/index.html"
  );
}

// async function getData() {
//   var res = await fetch("http://127.0.0.1:5500/questions.json");
//   var data = await res.json();
//   return data;
// }

//   --counter;
//   pageNumber.innerHTML = counter + 1;
//   answers.innerHTML = "";
//   for (var i = 0; i < questions[counter].answers.length; i++) {
//     console.log(questions[counter].answers[i]);
//     var li = document.createElement("li");
//     answers.append(li);
//     li.innerHTML = questions[counter].answers[i];
//   }
