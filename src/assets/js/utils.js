// remove all decendant elements of a given element
export function emptyGivenElement(element) {
  let fc = element.firstChild;

  while(fc) {
      element.removeChild(fc);
      fc = element.firstChild;
  }
}

// generates random sign 
export function randomSign(){ return (Math.random() > 0.5)? 1: -1; }

// returns the inverse sign of a value
export function inverseSign(value){ return (value >= 0)? -1 : 1; }

// self-Explanatory
export function angleBetweenTwoPoints(p1, p2){
  let [ dx, dy ] = [p2.x - p1.x, p2.y - p1.y];
  let theta = 
      Math.atan( Math.abs(dy) / Math.abs(dx) ) * 180 / Math.PI;

  if(dx >= 0) return (dy>=0)? theta : (-1) * theta;
  else return (dy>=0)? 180 - theta : (-1) * (180 - theta);
}

// if we provides a start point, a distance and an angle 
// then it returns the point of the destination.
export function getPositionTo(pFrom, d, angle) {
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
export function randomBetween(n1, n2){
  if(typeof n1 === 'number' && typeof n2 === 'number')
    return n1 + Math.floor(Math.random() * (n2 - n1));
  else
    return 0;
}
// transform html/xml string into its Data:URI equivalent - for use in svg filter <feImage> operator 
export function toDataURIString(string) {
  return "data:image/svg+xml," + 
    string.replace(/[\n]+/g, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/\>\s+\</g, "><")
    .replace(/\<|\>|\%/g, (match) => encodeURIComponent(match));
}

export function setPrototypeChain(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: false
    },
    _super: {
      value: parent,
      enumarable: false,
      writable: true,
      configurable: false
    }
  })
}

export function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

export function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

export function linearScale([d1, d2], [r1, r2]) {
  const [ dSpan, rSpan ] = [ d2 - d1, r2 - r1 ];
  return function(value) {
    if(value <= d1) {
      return r1;
    }
    else if(value >= d2) {
      return r2;
    } else {
      const percent = (value - d1) / dSpan;
      return r1 + rSpan * percent;
    }
  }
}