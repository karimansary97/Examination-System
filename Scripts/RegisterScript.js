var psw = document.getElementById("psw");
var rPsw = document.getElementById("psw-repeat");
var inputs = document.querySelectorAll("input");

/**
 * check Function
 * no params
 * help you to check the inputs in html
 * true take you to new page
 */

function Check() {
  let user = new User(
    inputs[0].value,
    inputs[1].value,
    inputs[2].value,
    inputs[3].value
  );

  localStorage.setItem("User", JSON.stringify(user));

  window.location.replace("http://127.0.0.1:5500/Screens/LoginPage/index.html");
}

function User(firstName, lastName, email, password) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
}

function validatePassword() {
  rPsw.setCustomValidity(
    psw.value != rPsw.value ? "Passwords Don't Match" : ""
  );
}
rPsw.onkeyup = validatePassword;
