import { timeConversion } from "./timeConversion";
const submitToggleActionStat = function (e) {
  let table = this.closest("div").querySelector("table");
  table.className = table.className == "action-info" ? "" : "action-info";
};

let toggleActionStat = document.querySelectorAll(".toggle-action-stat");
let projectDuration = document.querySelector(".projectDuration");
let durActTime = document.querySelectorAll(".durActTime");

if (toggleActionStat) {
  toggleActionStat.forEach(function (el) {
    el.addEventListener("click", submitToggleActionStat);
  });
}
if (projectDuration) {
  let res = 0;
  if (durActTime) {
    durActTime.forEach((el) => {
      res += el.dataset.duration * 1;
    });
  }
  projectDuration.innerHTML = timeConversion(res);
}
