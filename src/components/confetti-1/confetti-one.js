import easeFuncFactory from '@/assets/js/easeFuncFactory.js';
import { 
  randomSign, angleBetweenTwoPoints, getPositionTo, 
  emptyGivenElement
} from '@/assets/js/utils.js';

const xmlns = 'http://www.w3.org/2000/svg';
const CONFETTI_NUMBER = 35;
const REF_DURATION = 1000;
const Mouse = { x: null, y: null };

let confettiSets = [];
let Root, svgCanvas, bgrect, redCone, greyCone;;
let resizeHandler, requestId;
let maxAngleDeviation = 40;
let canvasW, canvasH;
let refConfetti;
let needScaleDown = false;

class Cone {
  constructor(x, y, node) {
    this.node = node;
    this.innerG = node.querySelector('g.inner');
    this.angle = 0;
    this.position = { x, y };
    this.explosionTip = { x: 0, y: 0 };
    this.explosionTipDistance = 60;
  }

  //methods
  updatePositionAndAngle() {
    this.node.setAttribute(
      'transform',
      `translate(${this.position.x}, ${this.position.y}) rotate(${this.angle})`
    );
  }
  calculate() {
    this.angle = angleBetweenTwoPoints(this.position, Mouse);
    this.explosionTip = getPositionTo(this.position, this.explosionTipDistance,  this.angle);
    this.updatePositionAndAngle();
  }
  addToCanvas() {
    svgCanvas.appendChild(this.node);
  }
  scaleDown() {
    this.innerG.setAttribute('transform', 'scale(0.7)');
    this.explosionTip = 60 * 0.7;
  }
};

class ConfettiSet {
  constructor(maxAngleDeviation, maxPopLength, cone){
    const new_g = document.createElementNS(xmlns, 'g');

    this.position = null;
    this.angle = null;
    this.confettis = [];
    this.gNode = new_g;
    this.cone = cone;
    this.maxAngleDeviation = maxAngleDeviation;
    this.maxPopLength = maxPopLength;

    svgCanvas.appendChild(this.gNode);
  }

  // methods
  createParticles() {
    let lengthGap = this.maxPopLength / CONFETTI_NUMBER;
    const [ refPoint, refDegAngle ] = [
      this.cone.explosionTip, this.cone.angle
    ];

    for(let i=0; i<CONFETTI_NUMBER; i++){
      const confetti = new Confetti({
        index: i, parent: this.gNode,
        maxAngleDeviation: this.maxAngleDeviation,
        lengthGap, refPoint, refDegAngle
      });

      if(needScaleDown) {
        confetti.scaleDown();
      }
      confetti.addToCanvas();
      this.confettis.push(confetti);
    }
  }
  removeAllParticles() {
    this.confettis = [];
    emptyGivenElement(this.gNode);
  }
}

// Confetti particle constructor
class Confetti {
  constructor({
    index, lengthGap, maxAngleDeviation, refPoint, refDegAngle, parent
  }) {

    this.obj = refConfetti.cloneNode(true);
    this.objInnerG = this.obj.querySelector('g.inner');
    this.objPath = this.objInnerG.firstElementChild;
    this.objScale = this.objPath.firstElementChild;
    this.parent = parent;
    this.popDistance = lengthGap * (index + 1);
    this.popAngle = refDegAngle + 
                    randomSign() * Math.floor( maxAngleDeviation * Math.random() );
    this.positionFrom = { x: refPoint.x, y: refPoint.y };
    this.positionCurr = { x: refPoint.x, y: refPoint.y };
    this.positionTo = getPositionTo(
      this.positionFrom, this.popDistance, this.popAngle
    );
    this.duration = REF_DURATION + randomSign() * Math.floor( 300 * Math.random() );
    this.easeFunc = { 
      x: easeFuncFactory({ easeType: 'ExpoOut', 
                          initValue: this.positionFrom.x, 
                          endValue: this.positionTo.x,
                          duration: this.duration
                        }),
      y: easeFuncFactory({ easeType: 'ExpoOut', 
                          initValue: this.positionFrom.y, 
                          endValue: this.positionTo.y,
                          duration: this.duration
                        })
    };

    let flipDuration = 900 + randomSign() * Math.floor( 200 * Math.random() );
    let [ translateMax, rotateRefVal ] = [ 
      5 + Math.floor(5 * Math.random()), 120 
    ];

    this.flip = {
      direction: 'forward',
      tRef: null,
      duration: flipDuration,
      translate: { 
        max: translateMax, 
        min: -translateMax, 
        curr: null 
      },
      rotate: { 
        min: (-1) * Math.floor( rotateRefVal * Math.random() ), 
        max: Math.floor( rotateRefVal * Math.random() ), 
        curr: null 
      }
    }

    this.flipEase = {
      translate: easeFuncFactory({ 
        easeType: 'QuadInOut',
        initValue: this.flip.translate.min,
        endValue: this.flip.translate.max,
        duration: flipDuration
      }),
      rotate: easeFuncFactory({ 
        easeType: 'QuadInOut',
        initValue: this.flip.rotate.min,
        endValue: this.flip.rotate.max,
        duration: flipDuration
      })
    }

    this.vDown = (-1) * (2 + 3 * Math.random());
    this.innerGY = 0;
    this.tInit = null;
    this.tCurr = null;
    this.count = 0;
  }

  // methods
  addToCanvas() {
    this.parent.appendChild(this.obj);
  }
  update(index){
    if(this.tInit === null) this.tInit = Date.now();
  
    this.updatePosition(index);
    this.updateInnerGroup();
    this.updateObjectTransform(index);
  }

  updatePosition() {
  
    let tElapse = ( Date.now() - this.tInit );
  
    if(tElapse <= this.duration){
      this.positionCurr.x = this.easeFunc.x(tElapse);
      this.positionCurr.y = this.easeFunc.y(tElapse) /*+ this.staticVy */;
      this.obj.setAttribute('transform', `translate(${this.positionCurr.x},${this.positionCurr.y})`);
    } else return;
  }
  
  updateInnerGroup() {
    this.innerGY += this.vDown;
    this.objInnerG.setAttribute('transform', `translate(0, ${this.innerGY})`);
  }

  scaleDown() {
    this.objScale.setAttribute('transform', 'scale(0.35)');
  }
  
  removeConfetti() {
    this.parent.removeChild(this.obj);
  };
  
  updateObjectTransform() {
    if(this.flip.tRef === null) this.flip.tRef = Date.now();
  
    const transformTypes = ['translate', /*'scale',*/ 'rotate'];
    let { /*scale, */ rotate, translate: t } = this.flip;
    let tElapse = Date.now() - this.flip.tRef;
  
    switch(this.flip.direction) {
      case 'forward':
        transformTypes.forEach( type => {
          this.flip[type].curr = this.flipEase[type](tElapse);
        });
      break;
      case 'backward':
        transformTypes.forEach( type => {
          this.flip[type].curr = this.flipEase[type](this.flip.duration - tElapse);
        });
      break;
      default: ;
    }
  
    this.objPath.setAttribute(
      'transform',
      `translate(${t.curr},0)
       rotate(${rotate.curr})`
       /* scale(1,${scale.curr}) */
    );
  
    if(tElapse >= this.flip.duration){
      this.flip.tRef = Date.now();
      this.flip.direction = 
        (this.flip.direction === 'forward')? 'backward' : 'forward';
      
      this.count++;
    }
    
  }

}

export function confettiAnimationSettings(svgDom) {

  Root = svgDom;
  bgrect = Root.querySelector('#bgrect');
  svgCanvas = Root.querySelector('#newcoordinate');
  // Confetti to copy from
  refConfetti = Root.querySelector('defs g.confetti');
  
  // mouse defaults to the upper center until svg starts keeping track of it
  ({ width : canvasW, height : canvasH } = bgrect.getBBox());
  Mouse.x = Math.floor(canvasW / 2);
  Mouse.y = canvasH - 10;

  // Flip the coordinate system so it's easier to work with.
  svgCanvas.setAttribute('transform', `scale(1,-1) translate(0,${-canvasH})`);

  // add EventListeners
  resizeHandler = function() {
    init();
  };
  Root.addEventListener('mousemove', mouseMoveHandler);
  Root.addEventListener('touchmove', touchMoveHandler);
  window.addEventListener('resize', resizeHandler);

  // run animation
  init();
  animate();

  function init() {
    
    emptyGivenElement(svgCanvas);
    confettiSets = [];
    ({ width : canvasW, height : canvasH } = bgrect.getBBox());
    svgCanvas.setAttribute('transform', `scale(1,-1) translate(0,${-canvasH})`);

    let maxPopLength = 
        Math.floor( Math.sqrt(canvasW*canvasW + canvasH*canvasH) * 0.5);
    
    needScaleDown = (canvasW <= 600)? true : false;
    const coneSpawn = { 
      x: needScaleDown? 50 : 100, 
      y: needScaleDown? 75: 150
    };

    // create Confetti Cones
    redCone = new Cone(
      coneSpawn.x, 
      canvasH - coneSpawn.y, 
      Root.querySelector('g.cone-red').cloneNode(true)
    );
    greyCone = new Cone(
      canvasW - coneSpawn.x, 
      canvasH - coneSpawn.y, 
      Root.querySelector('g.cone-grey').cloneNode(true)
    );

    [redCone, greyCone].forEach(cone => {
      if(needScaleDown){
        cone.scaleDown();
      }

      cone.calculate();
      cone.addToCanvas();
      confettiSets.push(
        new ConfettiSet(maxAngleDeviation, maxPopLength, cone)
      );
    });

  }

  function animate() {
    requestId = window.requestAnimationFrame(animate);

    confettiSets.forEach(set => {

      if(set.confettis.length <= 5){
        set.removeAllParticles();
        set.createParticles();
      }
      else {
        set.confettis.forEach((confetti, index) => {

          confetti.update(index);

          let roughY = confetti.positionCurr.y + confetti.innerGY;
          if(roughY <= -30){
            set.confettis.splice(index, 1);
            confetti.removeConfetti();
          }
          
        });
      }

    });

  }
}

export function destroyAnimation() {
  window.removeEventListener('resize', resizeHandler);
  window.cancelAnimationFrame(requestId);
  Root.removeEventListener('mousemove', mouseMoveHandler);
  Root.removeEventListener('touchmove', touchMoveHandler);
}

// EventHandler
function mouseMoveHandler(e) {

  const { currentTarget: target, clientX, clientY } = e;
  const { left, top, height } = target.getBoundingClientRect();
  // keeps track of the mouse pointer(the Y coordinate is flipped)
  [ Mouse.x, Mouse.y ] = [ clientX - left, height - (clientY - top)];

  // update Cones' Angles according to the mouse pointer
  redCone.calculate();
  greyCone.calculate();
}

function touchMoveHandler(e) {
  const touch = e.changedTouches[0];
  const { target, clientX, clientY } = touch;
  const { left, top, height } = target.getBoundingClientRect();

  [ Mouse.x, Mouse.y ] = [ clientX - left, height - (clientY - top)];
  redCone.calculate();
  greyCone.calculate();
}
