const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext('2d');

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
};

const colorArray = [
    '#FFFF33',
    '#FD1C03',
    '#00FF33',
    '#099FFF',
    '#FF00CC',
    '#CC00FF',
    '#f2f7fb',
    '#fff',
];

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(col) {
    return col[Math.floor(Math.random() * colorArray.length)];
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    console.log(this.radius);
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    // define speed of particles
    this.velocity = 0.05;
    // set range of particles from center
    this.distanceFromCenter = {
      x: randomIntFromRange(80, 260),
      y: randomIntFromRange(80, 260)
    };

    this.update = () => {
      // Move points over time
      this.radians += this.velocity;
      this.x = x + Math.cos(this.radians) * this.distanceFromCenter.x;
      this.y = y + Math.sin(this.radians) * this.distanceFromCenter.y;
      console.log(Math.cos(this.radians));
      this.draw();
    };

    this.draw = () => {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.globalAlpha = 0.8;
      c.fillStyle = this.color;
      c.fill();
      c.closePath();
    };
}




// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 400; i++) {
    let radius = Math.random() * 3 + 2;
    particles.push(new Particle(canvas.width/2, canvas.height/2, radius, randomColor(colorArray)));
  }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.8)';
    // draw new slight transparent rectangle on each frame
    c.fillRect(0, 0, canvas.width, canvas.height);
    // clear screen
    // c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.update();
    });
}

init();
animate();
