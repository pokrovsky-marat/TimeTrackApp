import "./userMenu";
import "./statistics";
import "./auth";
import "./projects";
import "./style/style.scss";
import axios from "axios";
import { timeConversion } from "./timeConversion";

//for timer
function checkTime(el, initialTime) {
  var timeDifference = Date.now() - initialTime;
  var formatted = convertTime(timeDifference);
  el.innerHTML = "" + formatted;
}

function convertTime(miliseconds) {
  var totalSeconds = Math.floor(miliseconds / 1000);
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds - minutes * 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return minutes + ":" + seconds;
}
window;
//
const submitAddAct = function (e) {
  let id = this.projectId.value;
  e.preventDefault();
  axios
    .post(`/api/v1/tours/${id}/reviews`, {
      description: this.description.value,
      name: this.name.value,
    })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.assign(`/acts/${id}`);
      }
    })
    .catch(function (error) {
      alert(error);
    });
};
const submitToggleAction = function (e) {
  this.disabled = true;
  e.preventDefault();
  let isStarted = this.value === "start" ? true : null;
  let actionId = this.closest("div").dataset.id;
  axios
    .put(`/api/v1/reviews/${actionId}`, {
      started: isStarted,
    })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.reload();
      }
    })
    .catch(function (error) {
      alert(error);
    });
};
const submitRemoveAction = function (e) {
  e.preventDefault();
  let res = confirm("Do you really want to delete this action?");
  if (!res) return;
  let id = this.closest("div").dataset.id;
  axios
    .delete(`/api/v1/reviews/${id}`)
    .then(function (response) {
      if (response.status === 204) {
        window.location.reload();
      }
    })
    .catch(function (error) {
      alert("Error. Try again");
    });
};

const submitEditAction = function (e) {
  let input = this.closest("div").querySelector("input");
  input.style.display = "inline-block";
  input.focus();
};
const submitEditActionName = function (e) {
  if (e.target.className !== "form-control edit-action-name") return;
  let id = e.target.closest("div").dataset.id;
  let name = e.target.value;
  axios
    .patch(`/api/v1/reviews/${id}`, { name })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.reload();
      }
    })
    .catch(function (error) {
      alert("Error. Try again");
    });
};

let toggleAction = document.querySelectorAll(".toggleAction");
let actionDuration = document.querySelectorAll(".actionDuration");
let addAct = document.getElementById("addAct");
let removeAction = document.querySelectorAll(".removeAction");
let editAction = document.querySelectorAll(".editAction");
let acts = document.querySelector(".acts");
let timer = document.querySelectorAll(".timer");

if (addAct) {
  addAct.addEventListener("submit", submitAddAct);
}
if (toggleAction) {
  toggleAction.forEach(function (el) {
    el.addEventListener("click", submitToggleAction);
  });
}
if (actionDuration) {
  actionDuration.forEach(function (el) {
    if (el.dataset.start) {
      el.innerHTML = "";
    } else {
      el.innerHTML = timeConversion(el.dataset.duration);
    }
  });
}
if (removeAction) {
  removeAction.forEach(function (el) {
    el.addEventListener("click", submitRemoveAction);
  });
}

if (editAction) {
  editAction.forEach(function (el) {
    el.addEventListener("click", submitEditAction);
  });
}
if (acts) {
  acts.addEventListener("change", submitEditActionName);
}
if (timer) {
  timer.forEach(function (el) {
    let initialTime = el.dataset.start;
    setInterval(() => {
      checkTime(el, initialTime);
    }, 1000);
  });
}
