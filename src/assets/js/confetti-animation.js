import easeFuncFactory from './easeFuncFactory.js';
import { 
  randomSign, angleBetweenTwoPoints, getPositionTo, 
  emptyGivenElement
} from './utils.js';

const xmlns = 'http://www.w3.org/2000/svg';
const CONFETTI_NUMBER = 35;
const REF_DURATION = 1000;

const confettiSets = [];
const Mouse = { x: null, y: null };

let svgCanvas, requestId;
let maxAngleDeviation = 40;
let canvasW, canvasH;
let refConfetti;
let [ redCone, greyCone ] = 
    [ coneDefaultFactory(), coneDefaultFactory() ];


function coneDefaultFactory(){
  return {
    node: null, angle: 0,
    position: { x: 0, y: 0 },
    burstTip: { x: 0, y: 0 },
    updatePositionAndAngle(){
      this.node.setAttribute(
       'transform', 
       `translate(${this.position.x}, ${this.position.y}) rotate(${this.angle})`
      );
    }
  };
}

function createConfettiSet ({
  maxAngleDeviation, maxPopLength, cone
}) {

  const new_g = document.createElementNS(xmlns, 'g');
  const confettiSet = {
    position: null,
    angle: null,
    confettis: [],
    gNode: new_g,
    cone,
    createParticles: function() {

      let lengthGap = maxPopLength / CONFETTI_NUMBER;
      const [ refPoint, refDegAngle ] = [
        cone.burstTip, cone.angle
      ];

      for(let i=0; i<CONFETTI_NUMBER; i++){
        this.confettis.push(
          new Confetti({
            index: i, parent: this.gNode,
            lengthGap, maxAngleDeviation, refPoint, refDegAngle
          })
        );
      }

    },
    removeAllParticles: function() {
      this.confettis = [];
      emptyGivenElement(this.gNode);
    }
  };

  svgCanvas.appendChild(confettiSet.gNode);
  confettiSet.createParticles();
  confettiSets.push(confettiSet);

}


// Confetti particle constructor
function Confetti ({
  index, lengthGap, maxAngleDeviation, refPoint, refDegAngle, parent
}) {

  this.obj = refConfetti.cloneNode(true);
  this.objInnerG = this.obj.querySelector('g.inner');
  this.objPath = this.objInnerG.firstElementChild;
  this.parent = parent;

  this.parent.appendChild(this.obj);

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
    /*
    scale: { 
      max: 1 + Math.floor(0.2 * Math.random()),
      min: 0.6 + Math.floor(0.2 * Math.random()), 
      curr: null 
    },
    */
  };

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
    /*
    scale: easeFuncFactory({ 
      easeType: 'Linear',
      initValue: this.flip.scale.min,
      endValue: this.flip.scale.max,
      duration: flipDuration
    }),
    */
  };

  this.vDown = (-1) * (2 + 3 * Math.random());
  this.innerGY = 0;

  this.tInit = null;
  this.tCurr = null;

  this.count = 0;
}

Confetti.prototype.update = function(index){
  if(this.tInit === null) this.tInit = Date.now();

  this.updatePosition(index);
  this.updateInnerGroup();
  this.updateObjectTransform(index);
};

Confetti.prototype.updatePosition = function() {

  let tElapse = ( Date.now() - this.tInit );

  if(tElapse <= this.duration){
    this.positionCurr.x = this.easeFunc.x(tElapse);
    this.positionCurr.y = this.easeFunc.y(tElapse) /*+ this.staticVy */;
    this.obj.setAttribute('transform', `translate(${this.positionCurr.x},${this.positionCurr.y})`);
  } else return;
};

Confetti.prototype.updateInnerGroup = function(){
  this.innerGY += this.vDown;
  this.objInnerG.setAttribute('transform', `translate(0, ${this.innerGY})`);
}

Confetti.prototype.removeConfetti = function(){
  this.parent.removeChild(this.obj);
};

Confetti.prototype.updateObjectTransform = function() {
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
  
};

export function confettiAnimationSettings(svgDom){

  DOMRegister.call(this, svgDom);

  ({ width : canvasW, height : canvasH } = 
  svgDom.querySelector('#bgrect').getBBox());
  // Flip the coordinate system so it's easier to work with.
  svgCanvas.setAttribute('transform', `scale(1,-1) translate(0,${-canvasH})`);
  
  // mouse defaults to the upper center until svg starts keeping track of it
  [ Mouse.x, Mouse.y ] = [ Math.floor(canvasW / 2), canvasH - 10 ];
  svgDom.addEventListener('mousemove', svgMouseMove);

  // Place confetti cones to the right positions
  redCone.position.x = 100;
  redCone.position.y = canvasH - 150;
  greyCone.position.x = canvasW - 100;
  greyCone.position.y = canvasH - 150;

  svgCanvas.appendChild(redCone.node);
  svgCanvas.appendChild(greyCone.node);

  calculateConeAngleAndUpdate();

  let maxPopLength = 
        Math.floor( Math.sqrt(canvasW*canvasW + canvasH*canvasH) * 0.5);

  [redCone, greyCone].forEach(cone => {
    createConfettiSet({
      maxAngleDeviation, maxPopLength, cone
    });
  });

  requestId = window.requestAnimationFrame(animateThings);

  function animateThings() {

    confettiSets.forEach(set => {

      if(set.confettis.length <= 5){
        set.removeAllParticles();
        set.createParticles();
      }
      else {
        set.confettis.forEach((confetti, index) => {

          confetti.update(index);

          let roughY = confetti.positionCurr.y + confetti.innerGY;
          if(roughY <= -10){
            set.confettis.splice(index, 1);
            confetti.removeConfetti();
          }
          
        });
      }

    });
    
    requestId = window.requestAnimationFrame(animateThings);
  }

}

function DOMRegister(svgDom){

  svgCanvas = svgDom.querySelector('#newcoordinate');

  // Confetti to copy from
  refConfetti = svgDom.querySelector('defs g.confetti');
  // confetti Cones
  redCone.node = svgDom.querySelector('g.cone-red').cloneNode(true);
  greyCone.node = svgDom.querySelector('g.cone-grey').cloneNode(true);

}

// update Cones according to the mouse pointer position change
function calculateConeAngleAndUpdate(){

  [redCone, greyCone].forEach(cone => {
    cone.angle = angleBetweenTwoPoints(cone.position, Mouse);
    cone.burstTip = getPositionTo(cone.position, 60,  cone.angle);
    cone.updatePositionAndAngle();
  });

}

// ********** EventHandler callbacks ********** //
function svgMouseMove(e){

  const { currentTarget: target, clientX, clientY } = e;
  const { left, top, height } = target.getBoundingClientRect();
  // keeps track of the mouse pointer(the Y coordinate is flipped)
  [ Mouse.x, Mouse.y ] = [ clientX - left, height - (clientY - top)];

  // update Cones' Angles according to the mouse pointer
  calculateConeAngleAndUpdate();
}

// util
/*
function emptySvgCanvas() {
  const cNode = svgCanvas.cloneNode(false);
  const parent = svgCanvas.parentNode;

  parent.replaceChild(cNode, svgCanvas);
  svgCanvas = parent.querySelector('#confetti-group');
}
*/