var userName = document.getElementById("userName");
var grade = document.getElementById("Grade");
var time = document.getElementById("TIME");
var user = JSON.parse(localStorage.getItem("User"));
var timeing = JSON.parse(localStorage.getItem("TIME"));
var grades = localStorage.getItem("Grades");
if (grades >= 50) {
  grade.style.color = "green";
  grade.innerHTML = `${grades}% Passed`;
} else {
  grade.style.color = "red";
  grade.innerHTML = `${grades}% Not Passed`;
}
userName.innerHTML = `${user.firstName} ${user.lastName}`;
time.innerHTML = timeing ? "IN TIME" : "TIMEOUT";
