export default function ({easeType, initValue, endValue, duration}) {

  switch(easeType){

    case 'QuadIn': 
      return t => {
        t /= duration;
        return (endValue - initValue)*t*t + initValue;
      };

    case 'QuadOut': 
      const A = endValue / duration;
      return t => A*(2*t - 1/duration*t*t) + initValue;

    case 'QuadInOut':
      return t => {
        t /= duration/2;
        if (t < 1) return (endValue - initValue)/2*t*t + initValue;
        t--;
        return -(endValue - initValue)/2 * (t*(t-2) - 1) + initValue;
      };

    case 'CubicIn': 
      return t => {
        t /= duration;
        return (endValue - initValue)*t*t*t + initValue;
      }

    case 'CubicOut': 
      return t => {
        t /= duration;
        t--;
        return (endValue - initValue)*(t*t*t + 1) + initValue;
      };

    case 'CubicInOut': 
      return t => {
        t /= duration/2;
        if (t < 1) return (endValue - initValue)/2*t*t*t + initValue;
        t -= 2;
        return (endValue - initValue)/2*(t*t*t + 2) + initValue;
      }

    case 'BounceOut': 
      return t => {
        if ((t/=duration) < (1/2.75)) {
          return (endValue - initValue)*(7.5625*t*t) + initValue;
        } else if (t < (2/2.75)) {
          return (endValue - initValue)*(7.5625*(t-=(1.5/2.75))*t + .75) + initValue;
        } else if (t < (2.5/2.75)) {
          return (endValue - initValue)*(7.5625*(t-=(2.25/2.75))*t + .9375) + initValue;
        } else {
          return (endValue - initValue)*(7.5625*(t-=(2.625/2.75))*t + .984375) + initValue;
        }
      };

    case 'ExpoOut': 
      return t => {
        return (t==duration) ? 
          endValue : (endValue - initValue) * (-Math.pow(2, -10 * t/duration) + 1) + initValue;
      };

    case 'ExpoIn':
      return t => {
        return (t==0) ? 
          initValue : (endValue - initValue) * Math.pow(2, 10 * (t/duration - 1)) + initValue;
      }
    
    default: 
      return t => {
        return (endValue - initValue)*t/duration + initValue;
      }
  }

};