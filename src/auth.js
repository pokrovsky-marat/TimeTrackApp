import axios from "axios";
const submitLogin = function (e) {
  e.preventDefault();
  axios
    .post("/api/v1/users/login", {
      email: this.email.value,
      password: this.password.value,
    })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.assign("/projects");
      }
    })
    .catch(function (error) {
      alert("You are not logged in. Try again");
    });
};
const submitSignup = function (e) {
  e.preventDefault();
  axios
    .post("/api/v1/users/signup", {
      email: this.email.value,
      password: this.password.value,
      name: this.name.value,
      passwordConfirm: this.passwordConfirm.value,
    })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.assign("/");
      }
    })
    .catch(function (error) {
      alert("You are not signed up. Try again");
    });
};
const submitLogout = function (e) {
  e.preventDefault();
  axios
    .get("/logout")
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.assign("/login");
      }
    })
    .catch(function (error) {
      alert("You are not logged out. Try again");
    });
};
let loginForm = document.getElementById("loginForm");
let signupForm = document.getElementById("signupForm");
let logout = document.getElementById("logout");
if (loginForm) {
  loginForm.addEventListener("submit", submitLogin);
}
if (signupForm) {
  signupForm.addEventListener("submit", submitSignup);
}
if (logout) {
  logout.addEventListener("click", submitLogout);
}
