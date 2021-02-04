import axios from "axios";

const submitAddProject = function (e) {
  e.preventDefault();
  axios
    .post("/api/v1/tours", {
      description: this.description.value,
      name: this.name.value,
    })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.assign("/projects");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Error. Try again");
    });
};
const submitRemoveProject = function (e) {
  e.preventDefault();
  let res = confirm("Do you really want to delete this project?");
  if (!res) return;
  let id = this.closest("div").dataset.id;
  axios
    .delete(`/api/v1/tours/${id}`)
    .then(function (response) {
      console.log(response.status);
      if (response.status === 204) {
        window.location.assign("/");
      }
    })
    .catch(function (error) {
      alert("Error. Try again");
      console.log(error);
    });
};
const submitEditProject = function (e) {
  let input = this.closest("div").querySelector("input");
  input.style.display = "inline-block";
  input.focus();
};
const submitEditProjectName = function (e) {
  if (e.target.className !== "form-control edit-project-name") return;
  let id = e.target.closest("div").dataset.id;
  let name = e.target.value;
  axios
    .patch(`/api/v1/tours/${id}`, { name })
    .then(function (response) {
      if (response.data.status === "success") {
        window.location.reload();
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Error. Try again");
    });
};

let addProject = document.getElementById("addProject");
let editProject = document.querySelectorAll(".editProject");
let projects = document.querySelector(".projects");
let removeProject = document.querySelectorAll(".removeProject");

if (addProject) {
  addProject.addEventListener("submit", submitAddProject);
}
if (removeProject) {
  removeProject.forEach(function (el) {
    el.addEventListener("click", submitRemoveProject);
  });
}
if (editProject) {
  editProject.forEach(function (el) {
    el.addEventListener("click", submitEditProject);
  });
}
if (projects) {
  projects.addEventListener("change", submitEditProjectName);
}
