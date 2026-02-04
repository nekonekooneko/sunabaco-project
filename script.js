const menuBtn = document.getElementById("menuBtn");
const siteNav = document.getElementById("siteNav");

menuBtn.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

