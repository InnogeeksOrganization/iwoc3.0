const card = document.querySelector(".logo-container");

card.addEventListener("mousemove", handleMouseMove);
card.addEventListener("mouseenter", setBoundingBox);
card.addEventListener("mouseleave", resetCard);

let boundingBox = null;

function setBoundingBox(event) {
  boundingBox = event.currentTarget.getBoundingClientRect();
}

function resetCard(event) {
  boundingBox = null;
  event.currentTarget.style.setProperty("--x-rotation", "0deg");
  event.currentTarget.style.setProperty("--y-rotation", "0deg");
  event.currentTarget.style.setProperty("--x", "50%");
  event.currentTarget.style.setProperty("--y", "50%");
}

function handleMouseMove(event) {
  if (!boundingBox) return;
  const x = event.clientX - boundingBox.left;
  const y = event.clientY - boundingBox.top;
  const xPercentage = x / boundingBox.width;
  const yPercentage = y / boundingBox.height;
  const xRotation = (xPercentage - 0.5) * 20;
  const yRotation = (0.5 - yPercentage) * 20;

  event.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
  event.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
  event.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
  event.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
}
