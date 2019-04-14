import * as utils from '@/assets/js/utils.js';
import easeFuncFactory from '@/assets/js/easeFuncFactory.js';

let requestId = null;
let resizeHandler;
let confettiContainer = null;
let confettis = [];
let clipText = null;
// detects if the viewport width is less than the size of mobile device
let isMobile = false; 

const xmlns = "http://www.w3.org/2000/svg";
const shapes = []; // will hold confetti objects
const confettiColors = ['#a0d10e', '#5dc8f0', '#f89201', '#FE6E61']; // colors to be randomly assigned to confetti particles
const canvas = { width: null, height: null }; // size of svgCanvas being displayed
const animateArea = { x: 0, y: 0, width: 0, height: 0 }; // specifies the portion of the page where animation happens
const CONFETTI_Y_UPPERLIMIT = -30;
const [ CONFETTI_AMOUNT_MAX, CONFETTI_AMOUNT_MIN ] = [ 60, 30 ];
// the function below is responsible for adjusting the amount of confetti particles depending on current viewport width
// 400, 1200 are arbitrary numbers chosen for min and max width where adjusting is done
const confettiAmountScale = utils.linearScale(
                              [400, 1200],
                              [CONFETTI_AMOUNT_MIN, CONFETTI_AMOUNT_MAX]
                            );
const ROTATION_REF_ANGLE = 120;

// Confetti Object 
class Confetti {
  constructor(x, y, index, color) {

    this.position = { x, y };
    this.index = index;
    this.color = color;
    this.node = {};
    this.node.whole = shapes[index%shapes.length].cloneNode(true);
    this.node.innerG = this.node.whole.querySelector('g.inner');
    this.node.scale = this.node.innerG.firstElementChild;
    this.node.container = confettiContainer;
    this.isLogo = (this.node.scale.dataset.logo)? true : false;

    const [ swayDuration, translateMax ] = 
    [
      utils.randomIntFromRange(800, 1200),
      utils.randomIntFromRange(5,10)
    ];

    this.sway = {
      direction: 'forward',
      tRef: null,
      duration: swayDuration,
      // ease functions below are responsible for making the particles movement look semi-realistic
      translate: {
        curr: null,
        ease: easeFuncFactory({ 
          easeType: 'QuadInOut',
          initValue: -translateMax,
          endValue: translateMax,
          duration: swayDuration
        })
      },
      rotate: {
        curr: null,
        ease: easeFuncFactory({ 
          easeType: 'QuadInOut',
          initValue: (-1) * Math.floor(ROTATION_REF_ANGLE*Math.random()),
          endValue: Math.floor(ROTATION_REF_ANGLE*Math.random()),
          duration: swayDuration
        })
      }
    };

    // y-velocity will contantly pulls down the confetti object, acting like gravity
    this.yVelocity = 0.5 + Math.random();
  }

  // methods
  update() {
    this.fall();
    this.wiggle();

    // update confetti position
    this.node.whole.setAttribute('transform', 
      `translate(${this.position.x},${this.position.y})`);
    
    // update confetti transform(wiggling)
    const { translate, rotate } = this.sway;
    this.node.innerG.setAttribute(
      'transform',
      `translate(${translate.curr},0)
      rotate(${rotate.curr})`
    );
  
    // when confetti hits the bottom of the animationArea(plus some extra margin), reset its position 
    if(this.position.y >= animateArea.y + animateArea.height + 20){
      this.positionReset();
    }
  }

  // responsible for making the particle fall down
  fall() {
    this.position.y += this.yVelocity;
  }

  // responsible for the wiggling movement of the particle
  wiggle() {
    // tRef is a point in time where a cycle of wiggling movement starts.
    // a cycle will ends when the current time becomes sway.duration + sway.tRef.(when tPassed becomes equal to or larger than sway.duration)
    if (this.sway.tRef === null) {
      this.sway.tRef = Date.now();
    }

    const transformTypes = ['translate', 'rotate'];
    let tPassed = Date.now() - this.sway.tRef;
    switch(this.sway.direction) {
      case 'forward':
        transformTypes.forEach(type => {
          this.sway[type].curr = this.sway[type].ease(tPassed);
        });
      break;
      case 'backward':
        transformTypes.forEach(type => {
          this.sway[type].curr = this.sway[type].ease(this.sway.duration - tPassed);
        });
      break;
      default: ;
    }
    
    // the point in time when a cycle of wiggling ends. it merely reverses the direction of movement.
    if (tPassed >= this.sway.duration) {
      this.sway.tRef = Date.now();
      this.sway.direction = 
        (this.sway.direction === 'forward')? 'backward' : 'forward';
    }
  }

  // add the confetti object to the svgCanvas
  add() {
    this.node.innerG.setAttribute('stroke', this.color);
    this.node.innerG.setAttribute('fill', this.color);
    this.node.container.appendChild(this.node.whole);
  }

  // remove confetti object from DOM and cache
  remove() {
    this.node.container.removeChild(
      this.node.whole
    );
    confettis.splice(this.index, 1);
  }

  // as soon as confetti hits a certain y value, reassign the position so it falls from top again.
  positionReset() {
    this.position.x = animateArea.x + animateArea.width * Math.random();
    this.position.y = utils.randomIntFromRange(animateArea.y + CONFETTI_Y_UPPERLIMIT, animateArea.y);
  }

  scaleDown() {
    this.node.scale.setAttribute('transform',
      `scale(${ (this.isLogo)? 0.25: 0.5 })` );
  }
  slowDown() {
    this.yVelocity *= 0.6;
  }
}

class ClipPathText {
  constructor(node, nodeForMeasure, svgCanvas){
    this.node = node;
    this.nodeForMeasure = nodeForMeasure;
    this.svgCanvas = svgCanvas;
    this.sizeInit = { width: 275, height: 40 };
  }

  // methods
  updateScale(wantedWidth, xPercent, yPercent) {
    const { width, height, x, y } = this.nodeForMeasure.getBBox();
    let [ xOffset, yOffset, scaleValue ] = 
    [ -x, 
      -y, 
      wantedWidth/width 
    ];
    let [ xMove, yMove ] = [ 
      (canvas.width * xPercent) / scaleValue - width * 0.5,
      (canvas.height * yPercent) / scaleValue - height * 0.5
    ];

    // animateArea Calculation
    animateArea.width = scaleValue * width;
    animateArea.height = scaleValue * height;
    animateArea.x = xPercent * canvas.width - animateArea.width * 0.5;
    animateArea.y = yPercent * canvas.height - animateArea.height * 0.5;

    this.node.setAttribute('transform', `scale(${scaleValue}) translate(${xOffset + xMove},${yOffset + yMove})`);
  }
  drawOutline() {
    this.svgCanvas.appendChild(this.node.cloneNode(true));
  }
}

export function animateSvg(Nodes) {

  const { svgCanvas, 
          bgrect, 
          particles, 
          clipPathText,
          clipPathTextMeasure } = Nodes;
 
  // add resize event handler
  resizeHandler = function(e){
    init();
  }
  window.addEventListener('resize', resizeHandler);
  // extracts all dom elements of the confetti particles to be used
  Array.prototype.slice
    .call(particles.querySelectorAll('.confetti'))
    .forEach(particle => shapes.push(particle));
  
  clipText = new ClipPathText(clipPathText, clipPathTextMeasure, svgCanvas);
 
  function init() {
 
    //empty all previous confettis from both cashe and DOM
    confettis = [];
    utils.emptyGivenElement(svgCanvas);
 
    // assign canvas dimension
    canvas.width = bgrect.getBBox().width;
    canvas.height = bgrect.getBBox().height;
    // the breakpoint for mobile in group-income design mockup is 375px;
    isMobile = (canvas.width <= 380)? true : false; 
    // clipPathText setting
    clipText.updateScale(
      (isMobile)? canvas.width * 0.8 : canvas.width * 0.7, 
      0.5, 
      (isMobile)? 0.825 : 0.275);
    clipText.drawOutline();
 
    const confettiAmount = Math.floor( confettiAmountScale(canvas.width) );
    // create a container g for all the confetti particles and append it to the canvas
    confettiContainer = document.createElementNS(xmlns, 'g');
    confettiContainer.setAttributeNS(null, 'id', 'confetti-container');
    confettiContainer.setAttributeNS(null, 'clip-path', "url(#cp)");
    svgCanvas.appendChild(confettiContainer);
 
    // create confetti particles and draw them on the canvas
    for (let i=0; i<confettiAmount; i++) {
      const confetti = new Confetti(
        animateArea.x + Math.random() * animateArea.width,
        utils.randomIntFromRange(animateArea.y + CONFETTI_Y_UPPERLIMIT, animateArea.y),
        i,
        utils.randomColor(confettiColors)
      );
      if(isMobile) {
        confetti.scaleDown();
      }
      confetti.add();
      confettis.push(confetti);
    }

  }

  function animate() {
    confettis.forEach(confetti => confetti.update());

    requestId = window.requestAnimationFrame(animate);
  }

  init();
  animate();
}

export function destroyAnimation() {
  window.cancelAnimationFrame(requestId);
  window.removeEventListener('resize', resizeHandler);
}
