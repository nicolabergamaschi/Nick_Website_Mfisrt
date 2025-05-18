window.addEventListener("load", () => {
  for (let i of document.querySelectorAll(".collapsible ol, .collapsible ul")) {
    let t = document.querySelector("div.toggle");
    
    t.onclick = () => t.classList.toggle("open");

  }
});

