let thread = document.getElementById("thread");
let dot = document.getElementById("dot");
let container = document.querySelector(".container");
let flag = false;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

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

function animateThread(frame){
    const amplitudeY = 20;
    const amplitudeX = 20;
    let deviationY = amplitudeY * (1 - frame) * Math.abs(Math.sin(frame * 3.14 * 3));
    let deviationX = amplitudeX * (1 - frame) * Math.sin(frame * 3.14 * 3);
    dot.setAttribute("cy", 185 - deviationY);
    thread.setAttribute("d", `M50 140 q${deviationX} ${(45 - deviationY)/4}, 0 ${(45 - deviationY)/2} t0 ${(45 - deviationY)/2}`);
}

async function returnThread(transition = 130) {
  const startTime = Date.now();
  let x = Number(thread.getAttribute("d").split(" ")[2].slice(1));
  let y = Number(thread.getAttribute("d").split(" ")[3]);
  while (Date.now() - startTime <= transition) {
    const difference = Date.now() - startTime;
    thread.setAttribute("d", `M50 140 L${x + (50 - x)*difference/transition} ${y + (185 - y)*difference/transition}`);
    dot.setAttribute("cx", x + (50 - x)*difference/transition);
    dot.setAttribute("cy", y + (185 - y)*difference/transition);
    await sleep(15);
  }
  thread.setAttribute("d", `M50 140 L50 185`);
  dot.setAttribute("cx", 50);
  dot.setAttribute("cy", 185);
  const animationTime = 800
  while (Date.now() - startTime - transition < animationTime){
    animateThread((Date.now() - startTime - transition)/animationTime);
    await sleep(15)
  }
  thread.setAttribute("d", `M50 140 L50 185`);
  dot.setAttribute("cx", 50);
  dot.setAttribute("cy", 185);
}

dot.addEventListener("mousedown", function () {
  document.addEventListener("mousemove", movingThread);
});

dot.addEventListener("mouseup", async function () {
  document.removeEventListener("mousemove", movingThread);
  container.classList.toggle("on");
  container.classList.toggle("off");
  await returnThread();
  flag = false;
});
