import easeFuncFactory from './easeFuncFactory.js';

let svgCanvas, requestId;

export function confettiAnimationSettings(svgDom){

  const xmlns = 'http://www.w3.org/2000/svg';
  const CONFETTI_NUMBER = 50;
  const refPoint = { x: null, y: null };
  const Vmax = 150, Vmin = 120;
  const GRAVITY = /*-9.8 */ -100;
  const FRICTION = 80;
  const REF_DURATION = 1000;
  
  const txtBoard = this.$el.querySelector('#txt');

  const confettiArr = [];
  let refDegAngle = 45, maxAngleDeviation = 40;
  let canvasW, canvasH;
  let refConfetti;
  let minPopLength, maxPopLength, lengthGap;

  function init() {

    let bgrectBox = svgDom.querySelector('#bgrect').getBBox();

    ({ width : canvasW, height : canvasH } = bgrectBox);

    svgCanvas = svgDom.querySelector('#newcoordinate');
    svgCanvas.setAttribute('transform', `scale(1,-1) translate(0,${-canvasH})`);
    refConfetti = svgDom.querySelector('defs g.confetti');
    
    refDegAngle = Math.floor( 180 * Math.random() ) * randomSign();
    refPoint.x = Math.floor( canvasW / 2 );
    refPoint.y = Math.floor( canvasH/ 2 );

    [ minPopLength, maxPopLength ] = [
      8,
      Math.floor( Math.sqrt(canvasW*canvasW + canvasH*canvasH) * 0.5)
    ];
    maxPopLength = 500;
    lengthGap = Math.floor( (maxPopLength - minPopLength) / CONFETTI_NUMBER );

    for(let i=0; i<CONFETTI_NUMBER; i++){
      let confetti = new Confetti(i);

      confettiArr.push(confetti);
      svgCanvas.appendChild(confetti.obj);
    }

  }
  
  /*
  function Confetti(index){

    this.obj = refConfetti.cloneNode(true);
    this.objPath = this.obj.querySelector('path');

    //this.Vinit = Vmin + (Vmax - Vmin) / CONFETTI_NUMBER * index;
    this.Vinit = Vmin + Math.floor( (Vmax - Vmin)*Math.random() );
    this.Vcurr = this.Vinit;
    this.angle = refDegAngle + randomSign() * Math.floor( maxAngleDeviation * Math.random() );
    this.theta = angleToUse(this.angle);

    let vxInit = this.Vinit * Math.cos(this.angle * Math.PI / 180 );
    let vyInit = this.Vinit * Math.sin(this.angle * Math.PI / 180 );

    this.vx = { init: vxInit, curr: vxInit };
    this.vy = { init: vyInit, curr: vyInit };
    this.position = { x: refPoint.x, y: refPoint.y };
    this.positionInit = { x: refPoint.x, y: refPoint.y };

    this.obj.setAttribute('transform', 
                        `translate(${this.position.x},${this.position.y})`);

    this.mass = 1 + Math.random() * 4;
    this.accel = {
      y: (GRAVITY + FRICTION * Math.sin(this.theta * Math.PI / 180) * inverseSign(vyInit) ) / this.mass,
      x: FRICTION * Math.cos(this.theta * Math.PI / 180) * inverseSign(vxInit) / this.mass
    };
    this.tTop = Math.abs(this.vy.init / this.accel.y);
    this.vyModeTwo = 5 + 10 * Math.random();

    this.flip = {
      scale: { curr: Math.random(), min: -1, max: 1, sign: -1, vel: 0.02 },
      skew: { curr: Math.floor( Math.random() * 20 ), min: -20, max: 20, sign: 1, vel: 0.3 + 0.3 * Math.random() },
      rotate: { curr: 0, min: -45, max: 45, sign: 1, vel: 1 }
    };

    this.modeTwo = false; // 1: running along the straight path, 2: running on the curve path
    this.tInit = null;
    this.easeFunc = easeFuncFactory({
      easeType: 'ExpoOut',
      initValue: 0, 
      endValue: 500,
      duration: 1000
    });

  }
  */

  function Confetti (index) {

    this.obj = refConfetti.cloneNode(true);
    this.objInnerG = this.obj.querySelector('g.inner');
    this.objPath = this.obj.querySelector('path');

    this.popDistance = minPopLength + lengthGap * (index + 1);
    this.popAngle = refDegAngle + 
                    randomSign() * Math.floor( maxAngleDeviation * Math.random() );
    
    this.positionFrom = { x: refPoint.x, y: refPoint.y };
    this.positionCurr = { x: refPoint.x, y: refPoint.y };
    this.positionTo = getPositionTo({
      pFrom: this.positionFrom, d: this.popDistance, angle: this.popAngle
    });

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
   let [ translateMax, rotateRefVal ] = 
   [
      5 + Math.floor(5 * Math.random()),
      120
   ];

   this.flip = {
     direction: 'forward',
     tRef: null,
     duration: flipDuration,
     translate: { max: translateMax, min: -translateMax, curr: null },
     scale: { 
      max: 1 + Math.floor(0.4 * Math.random()), 
      min: 0.2 + Math.floor(0.2 * Math.random()), 
      curr: null 
     },
     rotate: { 
       min: (-1) * Math.floor( rotateRefVal * Math.random() ), 
       max: Math.floor( rotateRefVal * Math.random() ), 
       curr: null 
     }
   };
   this.flipEase = {
     translate: easeFuncFactory({ 
       easeType: 'QuadInOut',
       initValue: this.flip.translate.min,
       endValue: this.flip.translate.max,
       duration: flipDuration
     }),
     scale: easeFuncFactory({ 
      easeType: 'Linear',
      initValue: this.flip.scale.min,
      endValue: this.flip.scale.max,
      duration: flipDuration
    }),
    rotate: easeFuncFactory({ 
      easeType: 'QuadInOut',
      initValue: this.flip.rotate.min,
      endValue: this.flip.rotate.max,
      duration: flipDuration
    })
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

  Confetti.prototype.updatePosition = function(index) {
    /*
    let tElapse = ( Date.now() - this.tInit ) / 100;
    let travelledX, travelledY;

    travelledX = this.vx.init * tElapse + 
                      this.accel.x * tElapse * tElapse / 2;
    travelledY = this.vy.init * tElapse + 
                      this.accel.y * tElapse * tElapse / 2;

    this.vx.curr = this.vx.init + this.accel.x * tElapse;
    this.vy.curr = this.vy.init + this.accel.y * tElapse;

    this.position.x = this.positionInit.x + travelledX;
    this.position.y = this.positionInit.y + travelledY;

    this.accel.x *= 0.1;
    
    this.obj.setAttribute('transform', `translate(${this.position.x},${this.position.y})`);
    */
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

  Confetti.prototype.removeConfetti = function(index){
    confettiArr.splice(index,1);

    let parent = this.obj.parentNode;
    parent.removeChild(this.obj);
  };

  Confetti.prototype.updateObjectTransform = function(index) {
    if(this.flip.tRef === null) this.flip.tRef = Date.now();

    const transformTypes = ['translate', 'scale', 'rotate'];
    let { scale, skew, rotate, translate: t } = this.flip;
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
       scale(1,${scale.curr})
       rotate(${rotate.curr})`
    );

    if(tElapse >= this.flip.duration){
      this.flip.tRef = Date.now();
      this.flip.direction = 
        (this.flip.direction === 'forward')? 'backward' : 'forward';
      
      this.count++;
    }
    
  };

  function animateThings() {
    confettiArr.forEach( (confetti, index) => {
      confetti.update(index);
    });

    requestId = window.requestAnimationFrame(animateThings);
  }

  init();
  requestId = window.requestAnimationFrame(animateThings);
}


// utility functions

function emptySvgCanvas() {
  const cNode = svgCanvas.cloneNode(false);
  const parent = svgCanvas.parentNode;

  parent.replaceChild( cNode, svgCanvas);
  svgCanvas = parent.querySelector('#confetti-group');
}

function randomSign(){
  return [-1, 1][Math.floor( 2*Math.random() )];
}

function inverseSign(value){ return (value >= 0)? -1 : 1; }

function angleToUse(angle){
  const absValue = Math.abs(angle);

  return (absValue <= 90)? absValue : 180 - absValue;
}

function getPositionTo({ pFrom, d, angle }) {
  const absAngle = Math.abs(angle);
  let [ xSign, ySign, theta ] = 
  [
    (absAngle > 90)? -1 : 1,
    (angle >= 0)? 1 : -1,
    (absAngle > 90)? 180 - absAngle : absAngle
  ];
  return {
    x: pFrom.x + xSign * d * Math.cos(theta * Math.PI / 180),
    y: pFrom.y + ySign * d * Math.sin(theta * Math.PI / 180)
  };
}
