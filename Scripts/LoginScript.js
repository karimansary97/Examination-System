var json = localStorage.getItem("User");
var user = JSON.parse(json);
var email = document.getElementById("email");
var password = document.getElementById("psw");

console.log(user);

function check() {
  if (user.email === email.value && user.password === password.value) {
    window.location.replace(
      "http://127.0.0.1:5500/Screens/ExaminationPage/index.html"
    );
  } else {
    alert("Please check your Email and Password");
  }
}
