<h1 align="center">VIS</h1>
<h4 align="center">A particle manipulation visual experience.</h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a>
</p>



<h3 align="center"><a href="https://github.com/laujonat/VIS">See it Live!</a></h3>
<img src="https://i.imgur.com/UeszUvm.png"/>




## Key Features

* Full screen immersion
  - Become fully immersed in the visual experience in full screen viewing.
* Cycle particle flow through various manipulation modes
* Viewable from mobile devices
  - Enjoy particle manipulation on your mobile device.
* Particles responsive to user touch and mouse clicks
  - Manipulate particles in various directions
* Hue color change

## Challenges

* One of the biggest challenges of this project was creating a smooth transition from the attraction effect into the circular spiral effect.  There would be a rigid transitional jump due to how the pixels must be rendered between 80 and 260 pixels of the mouse for the effect to take place. The below solution was implemented to continue forcing each particle to be within 20 pixels before the transition and start onto its circular path. 

```JavaScript
if ((mouse.x - this.x < 20 && mouse.x - this.x > -20
  && mouse.y - this.y < 20 && mouse.y - this.y > -20)) {
  this.flag = true;
} else {
  this.attract(mouse.x, mouse.y);
  this.integrate();
}
```


## How To Use

* Simply open web browser and enjoy!
* Click and tap to cycle flow behavior.
* Spacebar to reset.
