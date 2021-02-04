let userMenuList = document.getElementById("userMenuList");
let userMenu = document.getElementById("userMenu");

if (userMenu) {
  userMenu.addEventListener("click", () => {
    userMenuList.style.visibility =
      userMenuList.style.visibility == "visible" ? "hidden" : "visible";
  });
}