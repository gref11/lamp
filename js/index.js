let thread = document.getElementById("thread");
let dot = document.getElementById("dot");

function movingThread(event) {
  let x =
    Number(thread.getAttribute("d").split(" ")[2].slice(1)) +
    (event.movementX / window.innerHeight) * 400;
  let y =
    Number(thread.getAttribute("d").split(" ")[3]) +
    (event.movementY / window.innerHeight) * 400;
  thread.setAttribute("d", `M50 140 L${x} ${y}`);
  dot.setAttribute("cx", x);
  dot.setAttribute("cy", y);
}

function returnThread(transition=0.5){
    let x =
    Number(thread.getAttribute("d").split(" ")[2].slice(1)) +
    (event.movementX / window.innerHeight) * 400;
  let y =
    Number(thread.getAttribute("d").split(" ")[3]) +
    (event.movementY / window.innerHeight) * 400;
}

dot.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", movingThread);
});

dot.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", movingThread);
});
