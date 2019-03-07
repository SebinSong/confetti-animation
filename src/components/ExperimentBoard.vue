<template>
  <div class="container">
    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         version="1.1"
         @mousemove.stop="svgMouseMoveHandler">

      <defs>
        <radialGradient id="grad1" cx="250" cy="250" r="50" fx="220" fy="220"
                        spreadMethod="reflect" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="rgba(180,20,25,1)" />
          <stop offset="80%" stop-color="rgba(35,200,25,1)" />
        </radialGradient>

        <pattern id="pattern1" x="0" y="0" width="0.25" height="0.2" patternContentUnits="objectBoundingBox">
          <circle cx="0.1" cy="0.1" r="0.1" fill="rgba(180,20,25,0.5)" />
          <rect x="0" y="0" width="1" height="1" fill="rgba(0,0,0,0.1)" stroke="rgba(0,0,0,0.8)" stroke-width="0.01"/>
        </pattern>

        <linearGradient id="lg1" gradientTransform="rotate(75)">
          <stop offset="0%" stop-color="rgba(190,20,25,0.8)" />
          <stop offset="20%" stop-color="rgba(190,20,25,0.8)" />
          <stop offset="20%" stop-color="#fff" />
          <stop offset="40%" stop-color="#fff" />
          <stop offset="40%" stop-color="rgba(190,20,25,0.8)" />
          <stop offset="60%" stop-color="rgba(190,20,25,0.8)" />
          <stop offset="60%" stop-color="#fff" />
          <stop offset="80%" stop-color="#fff" />
          <stop offset="80%" stop-color="rgba(190,20,25,0.8)" />
          <stop offset="100%" stop-color="rgba(190,20,25,0.8)" />
        </linearGradient>

        <clipPath id="cp1">
          <text id="text1" x="350" y="650" font-size="100px"
          >TEXT</text>
        </clipPath>
      </defs>
      <path fill-rule="evenodd"
            fill="none"
            stroke="#222" stroke-width="2px"
            d="M 100,0 L40,100 200,100 150,0 70,140 170,140 z" />
      <path fill-rule="evenodd"
            fill="rgba(180,20,25,0.7)"
            d="M 100,0 Q 40,100 200,100 150,0 70,140 170,140 100,0 z" 
      />

      <path fill="none"
            stroke="rgba(25,195,30,1)" stroke-width="3"
            stroke-linecap="round"
            d="M50,250 c100,-200 200,200 300,0"
            ref="curve1"
      />

      <ellipse cx="50%" cy="50%" rx="100" ry="40" 
              fill="url(#pattern1)"
      />

      <path ref="trailingPath" 
            id="trailingpath"
            fill="none" 
            stroke="rgba(170,20,25,0)"
            stroke-width="4"
            stroke-dasharray="4,4" 
            stroke-linecap="round"
             />

      <g ref="circles" >
        <circle ref="prev" cx="0" cy="0" r="5" fill="red" class="cir" />
        <circle ref="curr" cx="0" cy="0" r="5" fill="green" class="cir" />
      </g>

      <text x="100" y="500"
            font-size="25px"
            fill="rgba(195,25,20,0.8)"
      >G
       <tspan x="5">r</tspan>
       <tspan x="25">o</tspan>
       <tspan dx="-10">w</tspan>
       <tspan dy="-30">w</tspan> 
      </text>

      <text x="100" y="400"
            font-size="30"
            kerning="20"
            textLength="200"
            lengthAdjust="spacingAndGlyphs"
      >Jason 
       <tspan dx="-55" dy="20" font-weight="bold"
              fill="none" stroke="rgba(0,0,0,0.7)">Mraz</tspan>
      </text>

      <text fill="black" font-size="20px">
        <textPath xlink:href="#trailingpath">
          <tspan dx="20">sebin song</tspan>
        </textPath>
      </text>

      <g transform="translate(200,300) rotate(90)">
        <path stroke="rgba(190,20,25,0.8)" stroke-width="3"
              stroke-linejoin="round"
              fill="url(#lg1)"
              d="M0,0 l-50,-120 h100 z" />
      </g>

      <g clip-path="url(#cp1)" fill-rule="evenodd">
        <circle id="cir1" ref="cir1"
                cx="400" cy="600" r="50" fill="rgba(185,20,25,0.7)"/>
      </g>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         version="1.1">
      <defs>
        <g data-name="circle"></g>
        <g data-name="confetti">
          <path fill="rgba(190,20,25,1)"
              d="M10,-5 l-5,10 h-10 l5,-10z"
          />
        </g>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="none" />
      <g id="confettipiece" transform="translate(350,0)"
         ref="confettiWrapper"
      >
        <path fill="rgba(190,20,25,1)"
              d="M10,-5 l-5,10 h-10 l5,-10z"
              ref="confetti"
        />
      </g>

      <path id="track1" ref="track1"
            fill="none" 
            stroke="rgba(0,0,0,0.65)"
            d="M0,700 L350,350"
        />
        <path id="track2" ref="track2"
              fill="none"
              stroke="rgba(225,0,0,0.75)"
              d="M350,350 q30,30 0,60 q-30,30 0,60 q30,30 0,60 q-30,30 0,60"
        />

        <g id="confetti-group"></g>
    </svg>
    <p id="txt" ref="txtBoard"></p>
  </div>
</template>
<style scoped lang='scss'>
  @import '../assets/confettione.scss';
</style>
<script>
export default {
  name: 'ConfettiOne',
  data(){
    return {
      requestId: null,
      prevPoint: null,
      pointsForPath: [],

      confettis: []
    };
  },
  methods: {
    moveCurve1(){

      let { curve1 } = this.$refs;
      let currCY;
      let vel = { abs: 3, sign: -1 };
      
      const [ maxCY, vm ] = [ 300, this ];

      currCY = maxCY;

      this.requestId = window.requestAnimationFrame(animateCurve);

      function animateCurve(){

        let newD;
        
        currCY += 5 * vel.sign;

        if(Math.abs(currCY) >= maxCY){
          vel.sign *= -1;
          currCY = (currCY < 0)? -maxCY : maxCY;
        }

        newD = `M50,250 c100,${-currCY} 200,${currCY} 300,0`;
        curve1.setAttribute('d', newD);

        vm.requestId = window.requestAnimationFrame(animateCurve);
      }

      function adjustAbsoluteVelocity(cy){
        // y = (Ax + 1/velMax)^(-1)
        const [ velMax, velMin ] = [ 40, 3 ];
        const A = (velMax - velMin) / (maxCY * velMax * velMin);
    
        return 1 / ( A * cy + 1/velMax );
      }
    },
    animateClipPath(){

      const { cir1 } = this.$refs;
      let ani = { id: null, vel: 7, sign: 1, xCurr: null };

      ani.xCurr = cir1.getAttribute('cx');
      if(ani.xCurr <= 400) ani.sign = 1;
      else if(ani.xCurr >= 600) ani.sign = -1;

      ani.id = window.requestAnimationFrame(moveCircle);

      function moveCircle(){

        ani.xCurr += ani.vel * ani.sign;
        if(ani.xCurr <= 400) {
          ani.xCurr = 400;
          ani.sign = 1;
        } 
        else if(ani.xCurr >= 600) {
          ani.xCurr = 600;
          ani.sign = -1;
        }

        cir1.setAttribute('cx', ani.xCurr);

        ani.id = window.requestAnimationFrame(moveCircle);
      }
    },
    getDistance(x1, y1, x2, y2){
      let [ dx, dy ] = [ x2 - x1, y2 - y1 ];

      return Math.sqrt(dx*dx + dy*dy);
    },
    svgMouseMoveHandler({ currentTarget: target, clientX, clientY }){

      const { trailingPath, txtBoard, prev, curr } = this.$refs;
      const { left: boxLeft, top: boxTop } = target.getBoundingClientRect();
      const [ x, y ] = [ clientX - boxLeft, 
                        clientY - boxTop ];
      const vm = this;
      
      if(this.prevPoint === null){
        this.pointsForPath.push({ x, y });
        this.prevPoint = { x, y };
        return;
      }
      else {
        let distance = this.getDistance(x, y, this.prevPoint.x, this.prevPoint.y);

        prev.setAttribute('cx', this.prevPoint.x);
        prev.setAttribute('cy', this.prevPoint.y);
        curr.setAttribute('cx', x);
        curr.setAttribute('cy', y);
        
        if(distance >= 5){
          let dValue = 'M ', pathLength;

          this.pointsForPath.push({ x, y });
          this.pointsForPath.slice().reverse().forEach( (p, index) => {
            dValue += (index === 0)? `${p.x},${p.y} L ` : `${p.x},${p.y} `;
          });

          trailingPath.setAttribute('d', dValue);
          txtBoard.textContent = JSON.stringify(this.pointsForPath);
          pathLength = trailingPath.getTotalLength();

          if(pathLength >= 150) this.pointsForPath.splice(0, 1);

          [ this.prevPoint.x, this.prevPoint.y ] = [ x, y ];
        } 

      }
    },

    // confetti animation part
    confettiMove1(){

      let { confetti, confettiWrapper } = this.$refs;
      const [ track1, track2 ] = [
        { totalLength: this.$refs.track1.getTotalLength(),
          node: this.$refs.track1,
          easeFunc: null
        }, 
        { totalLength: this.$refs.track2.getTotalLength(), 
          node: this.$refs.track2,
          easeFunc: null
        }
      ];
      let stage = 1, currPoint = { x: null, y: null };
      let currLength = 0, vel = 4, requestId = null, initTime = null, currTime, timeLimit;

      track1.easeFunc = this.quadEaseFactory(0, track1.totalLength, 800);
      track2.easeFunc = this.quadEaseFactory(0, track2.totalLength, 800);

      initTime = Date.now();
      timeLimit = 800;
      requestId = window.requestAnimationFrame(moveConfetti);

      function moveConfetti(timeStamp){
        currTime = (Date.now() - initTime > timeLimit)? timeLimit : Date.now() - initTime;
        currLength = (stage === 1)? track1.easeFunc(currTime) : track2.easeFunc(currTime);

        switch(stage){

          case 1: 
            if(currLength >= track1.totalLength) currLength = track1.totalLength;
            currPoint = track1.node.getPointAtLength(currLength);

            if(currTime === timeLimit){
              stage++;
              initTime = Date.now();
              timeLimit = 800;
            }
          break;
          case 2: 
            if(currLength >= track2.totalLength) currLength = track2.totalLength; 
            currPoint = track2.node.getPointAtLength(currLength);

            if(currTime === timeLimit){
              stage--;
              initTime = Date.now();
              timeLimit = 800;
            }
          break;
        }

        confettiWrapper.setAttribute('transform', `translate(${currPoint.x},${currPoint.y})`);
        requestId = window.requestAnimationFrame(moveConfetti);
      }
    },

    quadEaseFactory(initValue, endValue, duration){

      /* quadratic easeOut
  	  const A = endValue / duration;
      return t => A*(2*t - 1/duration*t*t) + initValue;
      */

      /* quadratic easeIn
      return t => {
        t /= duration;
        return (endValue - initValue)*t*t + initValue;
      };
      */

      /* quadratic easeInOut
      return t => {
        t /= duration/2;
        if (t < 1) return (endValue - initValue)/2*t*t + initValue;
        t--;
        return -(endValue - initValue)/2 * (t*(t-2) - 1) + initValue;
      }
      */

      /* Cubic easeIn
      return t => {
        t /= duration;
	      return (endValue - initValue)*t*t*t + initValue;
      }
      */

      /* Cubic easeOut
        t /= duration;
        t--;
        return (endValue - initValue)*(t*t*t + 1) + initValue;      
      */

      /* Cubic easeInOut
        t /= duration/2;
        if (t < 1) return (endValue - initValue)/2*t*t*t + initValue;
        t -= 2;
        return (endValue - initValue)/2*(t*t*t + 2) + initValue;
      */

      /* BounceEaseOut
        if ((t/=duration) < (1/2.75)) {
          return (endValue - initValue)*(7.5625*t*t) + initValue;
        } else if (t < (2/2.75)) {
          return (endValue - initValue)*(7.5625*(t-=(1.5/2.75))*t + .75) + initValue;
        } else if (t < (2.5/2.75)) {
          return (endValue - initValue)*(7.5625*(t-=(2.25/2.75))*t + .9375) + initValue;
        } else {
          return (endValue - initValue)*(7.5625*(t-=(2.625/2.75))*t + .984375) + initValue;
        }
      */

      /* easeOutExpo 
        return (t==duration) ? 
          endValue : (endValue - initValue) * (-Math.pow(2, -10 * t/duration) + 1) + initValue;
      */

      /* easeInExpo
        return (t==0) ? 
          initValue : (endValue - initValue) * Math.pow(2, 10 * (t/duration - 1)) + initValue;
      */

      return t => {
        return (t==duration) ? 
          endValue : (endValue - initValue) * (-Math.pow(2, -10 * t/duration) + 1) + initValue;
      }
    },



  },
  mounted(){
    // this.moveCurve1();
    // this.animateClipPath();
    this.confettiMove1();
  }
}
</script>