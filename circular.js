const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const maxRadius = 30;
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
    console.log(`x: ${mouse.x} y: ${mouse.y}` );
});

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

let toggleAnimation = 1;

window.addEventListener('click', () => {
  if ( toggleAnimation === 3) {
    toggleAnimation = 1;
    return;
  }
  toggleAnimation += 1;
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

function rand(max, min, _int) {
  var max = (max === 0 || max)?max:1,
      min = min || 0,
      gen = min + (max - min) * Math.random();

  return (_int) ? Math.round(gen) : gen;
}


function Particle(x, y, dx, dy, radius, color) {
    this.x = this.oldX = x;
    this.y = this.oldY = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.hue = rand(50, 0, 1);
    this.radius = radius;
    this.color = color;


    // define how far that particle will be away from mouse

    // circular
    this.radians = Math.random() * Math.PI * 2;
    // define speed of particles
    this.velocity = 0.03;
    this.lastMouse = {x: x, y: y};
    // set range of particles from center
    this.distanceFromCenter = {
      x: randomIntFromRange(80, 260),
      y: randomIntFromRange(80, 260)
    };


    this.flag = false;





    /* http://www.playfuljs.com/particle-effects-are-easy/ */
    this.attract = (x_, y_) => {
      let dx_ = (x_ - this.x);
      let dy_ = (y_ - this.y);
      let distance_ = Math.sqrt(dx_ * dx_ + dy_ * dy_);

      this.x += 3 * dx_ / distance_;
      this.y += 3 * dy_ / distance_;
    };

    this.detract = (x_, y_) => {
      let dx_ = (x_ - this.x);
      let dy_ = (y_ - this.y);
      let distance_ = Math.sqrt(dx_ * dx_ + dy_ * dy_);
      this.x -= 4 * dx_ / distance_;
      this.y -= 4 * dy_ / distance_;
    };


    this.integrate = () => {
      var velocityX = this.x - this.oldX;
      var velocityY = this.y - this.oldY;
      this.oldX = this.x;
      this.oldY = this.y;
      this.x += velocityX/3;
      this.y += velocityY/3;
    };

    this.update = () => {
      const lastPoint = {x: this.x, y: this.y};


      if (toggleAnimation === 1) {

        this.attract(mouse.x, mouse.y);
        this.integrate();

        // attraction visual



      } else if (toggleAnimation === 2) {

        // circular
        this.radians += this.velocity;

        // drag effect
        if (this.flag) {
          this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
          this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

          // console.log("close!");
          this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
          this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;


        } else {
          if ((mouse.x - this.x < 20 && mouse.x - this.x > -20
            && mouse.y - this.y < 20 && mouse.y - this.y > -20)) {


            this.flag = true;
          } else {
            this.attract(mouse.x, mouse.y);
            this.integrate();
          }
        }



        // if ((mouse.x - this.x < 100 && mouse.x - this.x > -100
        //   && mouse.y - this.y < 100 && mouse.y - this.y > -100)) {
        //
        //
        //   this.x += Math.cos(this.radians);
        //   this.y += Math.sin(this.radians);
        //
        //   console.log("here");
        //
        //
        //
        //   attract = true;
        // } else {
        //   // keep pulling particle closer
        //   attract = false;
        //
        //   this.attract(mouse.x, mouse.y);
        //   this.integrate();
        // }

        //var dx=point2.x-point1.x;
        //var dy=point2.y-point1.y;
        // var distance=Math.sqrt(dx*dx+dy*dy);


        // this.x += Math.cos(this.radians);
        // this.y += Math.sin(this.radians);
        // circular effect
        // this.x += this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter.x;
        // this.y += this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter.y;



      } else if (toggleAnimation === 3) {
        this.flag = false;


        // detraction effect

        this.detract(mouse.x, mouse.y);
        this.integrate();

      }

      if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      // interactivity
      if (mouse.x - this.x < 40 && mouse.x - this.x > -40
          && mouse.y - this.y < 40 && mouse.y - this.y > -40) {
        // enforce max radius
        if (this.radius < maxRadius) {
          this.radius += 3;
        }

      } else if (this.radius > this.minRadius) {
        // ensure radius will not shrink past original radius of circle
        this.radius -= 1;
      }
      this.draw(lastPoint);
    };

    this.draw = lastPoint => {
      this.hue -= 2;

      c.beginPath();
      // c.strokeStyle = this.color;
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // c.moveTo(lastPoint.x, lastPoint.y);
      // c.lineTo(this.x, this.y);
      c.globalAlpha = 0.6;

      c.fillStyle = `hsla(${this.hue}, 100%, 50%,1)`;
      // c.fillStyle = this.color;
      c.fill();
      // c.stroke();
      c.closePath();
    };
}

// Implementation
let particles;
function init() {
  particles = [];

  for (let i = 0; i < 1000; i++) {
    let radius = Math.random() * 8 + 2;
    // let radius = 20;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = (Math.random() - 0.5);
    let dy = (Math.random() - 0.5);
    particles.push(new Particle(x, y, dx, dy,
      radius, randomColor(colorArray)));
  }
}
// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0, 0, 0, 0.8)';
    // draw new slight transparent rectangle on each frame
    c.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
      particle.update();
    });
}

init();
animate();
