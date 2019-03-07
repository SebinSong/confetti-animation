// remove all decendant elements of a given element
export function emptyGivenElement(element) {
  let fc = element.firstChild;

  while(fc) {
      element.removeChild(fc);
      fc = element.firstChild;
  }
}

// generates random sign 
export function randomSign(){ 
  return [-1, 1][Math.floor( 2*Math.random() )]; 
}

// returns the sign of a value
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
