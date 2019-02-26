import easeFuncFactory from './easeFuncFactory.js';

let svgCanvas, requestId;

export function confettiAnimationSettings(svgDom){

  const [
    xmlns, 
    CONFETTI_NUMBER,
    refPoint,
    refDegAngle,
    maxAngleDeviation,
    Duration
  ] = [
    'http://www.w3.org/2000/svg',
    30,
    { x: 30, y: 30 },
    40,
    30,
    { straight: 800, curve: 1500 }
  ];
  const confettiArr = [];
  let canvasW, canvasH;
  let refConfetti;
  let minPathLength, maxPathLength, lengthGap;

  svgCanvas = svgDom.querySelector('#newcoordinate');


  function init() {

    let bgrectBox = svgDom.querySelector('#bgrect').getBBox();

    ({ width : canvasW, height : canvasH } = bgrectBox);

    svgCanvas.setAttribute('transform', `scale(1,-1) translate(0,${-canvasH})`);
    refConfetti = refConfetti = svgDom.querySelector('defs g.confetti');

    [ minPathLength, maxPathLength ] = [
      8,
      Math.floor( Math.sqrt(canvasW*canvasW + canvasH*canvasH) * 0.8 )
    ];
    lengthGap = Math.floor( (maxPathLength - minPathLength) / CONFETTI_NUMBER );

    for(let i=0; i<CONFETTI_NUMBER; i++){
      let confetti = new Confetti(i);

      confettiArr.push(confetti);
      svgCanvas.appendChild(confetti.group);
    }

  }
  
  function Confetti(index){

    let cGroup = refConfetti.cloneNode(true);
    let l, angle, dx, dy;

    this.group = cGroup;
    this.straightPath = cGroup.querySelector('.straight');
    this.curvePath = cGroup.querySelector('.curve');

    this.obj = cGroup.querySelector('.obj');
    this.objPath = this.obj.querySelector('path');

    l = minPathLength + index * lengthGap;
    angle = refDegAngle + randomSign() * Math.floor( maxAngleDeviation * Math.random() );
    dx = l * Math.cos( angle * Math.PI / 180 );
    dy = l * Math.sin( angle * Math.PI / 180 );

    this.straightPath.setAttribute('d', `M${refPoint.x},${refPoint.y} l${dx},${dy}`);
    this.currPoint = { x: refPoint.x, y: refPoint.y };

    let curveStartPoint = this.straightPath.getPointAtLength( this.straightPath.getTotalLength() );
    this.curvePath.setAttribute('d', 
                                `M${curveStartPoint.x},${curveStartPoint.y}
                                q20,-20 0,-60 q-20,-20 0,-60 q20,-20 0,-60 q-20,-20 0,-60
                            `  );

    let curveEndPoint = this.curvePath.getPointAtLength( this.curvePath.getTotalLength() );
    this.obj.setAttribute('transform', `translate(${curveEndPoint.x},${curveEndPoint.y})`);

    this.pathLength = {
      straight: this.straightPath.getTotalLength(),
      curve: this.curvePath.getTotalLength()
    };

    this.flip = {
      scale: { curr: Math.random(), min: -1, max: 1, sign: -1, vel: 0.02 },
      skew: { curr: Math.floor( Math.random() * 20 ), min: -20, max: 20, sign: 1, vel: 0.3 + 0.3 * Math.random() },
      rotate: { curr: 0, min: -45, max: 45, sign: 1, vel: 1 }
    };

    this.fadeOut = {
      scale: easeFuncFactory({
        easeType: 'Linear',
        initValue: 1, endValue: 0.2,
        duration: Duration.curve
      }),
      opacity: easeFuncFactory({
        easeType: 'Linear',
        initValue: 1, endValue: 0,
        duration: Duration.curve
      })
    }

    this.stage = 1; // 1: running along the straight path, 2: running on the curve path
    this.tInit = null;
    this.easeFunc = easeFuncFactory({
      easeType: 'ExpoOut',
      initValue: 0, 
      endValue: this.pathLength.straight,
      duration: Duration.straight
    });
  }

  Confetti.prototype.update = function(index){

    if(this.tInit === null) this.tInit = Date.now();
    
    // flipping Object
    
    let { scale, skew, rotate } = this.flip;

    // - scale
    scale.curr += scale.sign * scale.vel;

    if(scale.curr <= scale.min) {
      scale.curr = scale.min;
      scale.sign = 1;
    } else if(scale.curr >= scale.max) {
      scale.curr = scale.max;
      scale.sign = -1;
    }

    // - skew
    skew.curr += skew.sign * skew.vel;
    if(skew.curr <= skew.min) {
      skew.curr = skew.min;
      skew.sign = 1;
    } else if(skew.curr >= skew.max) {
      skew.curr = skew.max;
      skew.sign = -1;
    }

    // - rotate
    rotate.curr += rotate.sign * rotate.vel;
    if(rotate.curr <= rotate.min) {
      rotate.curr = rotate.min;
      rotate.sign = 1;
    } else if(rotate.curr >= rotate.max) {
      rotate.curr = rotate.max;
      rotate.sign = -1;
    }

    this.objPath.setAttribute('transform', `scale(1,${scale.curr}) skewX(${skew.curr}) rotate(${rotate.curr})`);

    // moving object along the paths
    let toP, tLapse, currentDistance;

    switch(this.stage){

      case 1:
        tLapse = Date.now() - this.tInit;
        currentDistance = this.easeFunc(tLapse);

        if(currentDistance >= this.pathLength.straight){
          this.stage++;
          this.tInit = null;
          this.easeFunc = easeFuncFactory({
            easeType: 'Linear',
            initValue: 0,
            endValue: this.pathLength.curve,
            duration: Duration.curve
          });
          currentDistance = this.pathLength.straight;
        }

        toP = this.straightPath.getPointAtLength( currentDistance );
        this.obj.setAttribute('transform', `translate(${toP.x},${toP.y})`);
      break;

      case 2:
        tLapse = Date.now() - this.tInit;
        currentDistance = this.easeFunc(tLapse);

        let [ currentOpacity, currentScale ] = [
          this.fadeOut.opacity(tLapse), this.fadeOut.scale(tLapse)
        ];

        if(currentDistance >= this.pathLength.curve){
          currentDistance = this.pathLength.curve;
          this.stage++;
        }

        toP = this.curvePath.getPointAtLength(currentDistance);
        this.obj.setAttribute('transform',
                              `translate(${toP.x},${toP.y}) scale(${currentScale})`);
        this.obj.setAttribute('opacity', currentOpacity);
        
      break;
      case 3:
        confettiArr.splice(index, 1);
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
