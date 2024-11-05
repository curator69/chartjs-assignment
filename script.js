const canvas = document.getElementById("bubblesCanvas");
const ctx = canvas.getContext("2d");

const circles = [
  { x: 50, y: 60, radius: 20, color: "red" },
  { x: 50, y: 140, radius: 20, color: "green" },
  { x: 50, y: 220, radius: 20, color: "blue" },
  { x: 50, y: 300, radius: 20, color: "yellow" },
];

const arrows = [
  { x: 500, y: 60, dx: -5, targetIndex: 0, moving: false },
  { x: 500, y: 140, dx: -5, targetIndex: 1, moving: false },
  { x: 500, y: 220, dx: -5, targetIndex: 2, moving: false },
  { x: 500, y: 300, dx: -5, targetIndex: 3, moving: false },
];

function drawCircles() {
  circles.forEach((circle) => {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
  });
}

function drawArrows() {
  arrows.forEach((arrow) => {
    ctx.beginPath();
    ctx.moveTo(arrow.x, arrow.y);
    ctx.lineTo(arrow.x - 15, arrow.y - 5);
    ctx.lineTo(arrow.x - 15, arrow.y + 5);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCircles();
  drawArrows();
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  circles.forEach((circle, index) => {
    const dx = mouseX - circle.x;
    const dy = mouseY - circle.y;
    if (Math.sqrt(dx * dx + dy * dy) < circle.radius) {
      arrows[index].moving = true;
    }
  });
});

function updateArrows() {
  arrows.forEach((arrow) => {
    if (arrow.moving) {
      arrow.x += arrow.dx;
      const target = circles[arrow.targetIndex];
      if (arrow.x <= target.x + target.radius) {
        arrow.moving = false;
        target.color = "grey";
      }
    }
  });
}

function reset() {
  arrows.forEach((arrow) => {
    arrow.x = 500;
    arrow.moving = false;
  });
  circles.forEach((circle, index) => {
    circle.color = ["red", "green", "blue", "yellow"][index];
  });
  draw();
}

document.getElementById("resetButton").addEventListener("click", reset);

function animate() {
  draw();
  updateArrows();
  requestAnimationFrame(animate);
}

reset();
animate();
