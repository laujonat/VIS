const canvas = document.querySelector('canvas');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const maxRadius = 80;
// const minRadius = 10;
const colorArray = [
    // '#ffa300',
    // '#cf0060',
    // '#ff00ff',
    // '#13a8fe',
    // '#13a8fe',
    '#FFFF33',
    '#FD1C03',
    '#00FF33',
    '#099FFF',
    '#FF00CC',
    '#CC00FF',
    '#f2f7fb',
    '#fff',
];


const c = canvas.getContext('2d');

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(`x: ${mouse.x}, y: ${mouse.y}`);
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});

function Circle(x, y, dx, dy, radius, minRadius) {
  this.x = this.oldX = x;
  this.y = this.oldY = y;

  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  this.draw = () => {
    c.beginPath();
    // arc (x, y, radius, start angle, end angle, counterclockwise)
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // c.strokeStyle = '#154167';
    // c.stroke();
    c.globalAlpha = 0.7;
    c.fillStyle = this.color;
    c.fill();
  };


  /* KEY ANIMATION FUNCTION OF APPLICATION */
  this.update = () => {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    // mouse position less than 50 pixels away from circle and
    // no more than 50 pixels away are growing
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50
        && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
      // enforce max radius
      if (this.radius < maxRadius) {
        this.radius += 3;
        // if (this.radius > maxRadius) {
        //   while(this.radius > this.minRadius) {
        //     this.radius -= 1;
        //   }
        // }
      }

    } else if (this.radius > this.minRadius) {
      // ensure radius will not shrink past original radius of circle
      this.radius -= 1;
    }

    this.draw();
  };
}


/* http://www.playfuljs.com/particle-effects-are-easy/ */
Circle.prototype.attract = function(x, y) {
  let dx = x - this.x;
  let dy = y - this.y;
  let distance = Math.sqrt(dx * dx + dy * dy);
  this.x += dx / distance;
  this.y += dy / distance;
};

// mouse will trigger particle direction.
// this updates the particle's velocity.
Circle.prototype.integrate = function() {
  var velocityX = this.x - this.oldX;
  var velocityY = this.y - this.oldY;
  this.oldX = this.x;
  this.oldY = this.y;
  this.x += velocityX/6;
  this.y += velocityY/6;
};


let circleArray = [];
function init() {
  circleArray = [];
  for (let i = 0; i < 1000; ++i) {
    let radius = Math.random() * 3 + 2; // radius ranges of 2-5
    console.log(radius);
    // subtract diameter and add radius to make sure circle does not spawn on
    // edge of screen
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}

for (let i = 0; i < 1000; ++i) {
  let radius = Math.random() * 3 + 2; // range of 2-5
  // console.log(radius);
  // subtract diameter and add radius to make sure circle does not spawn on
  // edge of screen
  let x = Math.random() * (canvas.width - radius * 2) + radius;
  let y = Math.random() * (canvas.height - radius * 2) + radius;
  let dx = (Math.random() - 0.5);
  let dy = (Math.random() - 0.5);
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for( let i = 0; i < circleArray.length; ++i) {
    circleArray[i].attract(mouse.x, mouse.y);
    circleArray[i].integrate();
    circleArray[i].update();
  }
}

animate();
