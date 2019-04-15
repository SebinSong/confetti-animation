import * as utils from '@/assets/js/utils.js'
import easeFuncFactory from '@/assets/js/easeFuncFactory.js'

let requestId = null
let resizeHandler
let confettiContainer = null
let confettis = []

const shapes = [] // will hold confetti objects
const confettiColors = ['#a0d10e', '#5dc8f0', '#f89201', '#FE6E61'] // colors to be randomly assigned to confetti particles
const canvas = { width: null, height: null } // size of svgCanvas being displayed
// left&right padding that will given to svgCanvas. these will get smaller as the viewport width gets smaller
const padding = { x: 200 }
const [ PADDING_X_MIN, PADDING_X_MAX ] = [ 0, 150 ]
const paddingXScale = utils.linearScale(
  [400, 1200],
  [PADDING_X_MIN, PADDING_X_MAX]
)
const xmlns = 'http://www.w3.org/2000/svg'
const CONFETTI_Y_UPPERLIMIT = -400
const [ CONFETTI_AMOUNT_MAX, CONFETTI_AMOUNT_MIN ] = [ 60, 20 ]
const confettiAmountScale = utils.linearScale(
  [400, 1200],
  [CONFETTI_AMOUNT_MIN, CONFETTI_AMOUNT_MAX]
)
const ROTATION_REF_ANGLE = 120
const [ SCALE_MAX, SCALE_MIN, SCALE_DEVIATION ] = [1, -1, 0.3]

// Confetti Object
class Confetti {
  constructor (x, y, index, color) {
    this.position = { x, y }
    this.index = index
    this.color = color
    this.node = {}
    this.node.whole = shapes[index % shapes.length].cloneNode(true)
    this.node.innerG = this.node.whole.querySelector('g.inner')
    this.node.container = confettiContainer

    const [ swayDuration, translateMax ] =
    [
      utils.randomIntFromRange(800, 1200),
      utils.randomIntFromRange(5, 10)
    ]

    this.sway = {
      direction: 'forward',
      tRef: null,
      duration: swayDuration,
      // ease functions below are responsible for making the particles movement look realistic
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
          initValue: (-1) * Math.floor(ROTATION_REF_ANGLE * Math.random()),
          endValue: Math.floor(ROTATION_REF_ANGLE * Math.random()),
          duration: swayDuration
        })
      },
      scale: {
        curr: null,
        ease: easeFuncFactory({
          easeType: 'Linear',
          initValue: SCALE_MIN + Math.floor(SCALE_DEVIATION * Math.random()),
          endValue: SCALE_MAX + Math.floor(SCALE_DEVIATION * Math.random()),
          duration: swayDuration
        })
      }
    }

    // y-velocity will contantly pulls down the confetti object, acting like gravity
    this.yVelocity = 0.5 + Math.random() * 2.5
  }

  // methods
  update () {
    this.fall()
    this.wiggle()

    // update confetti position
    this.node.whole.setAttribute('transform',
      `translate(${this.position.x},${this.position.y})`)

    // update confetti transform(wiggling)
    const { translate, rotate, scale } = this.sway
    this.node.innerG.setAttribute(
      'transform',
      `translate(${translate.curr},0)
      rotate(${rotate.curr})
      scale(1,${scale.curr})`
    )

    // when confetti hits the bottom of the canvas(plus some extra margin), reset its position
    if (this.position.y >= canvas.height + 50) {
      this.positionReset()
    }
  }

  // responsible for making the particle fall down
  fall () {
    this.position.y += this.yVelocity
  }

  // responsible for the wiggling movement of the particle
  wiggle () {
    // tRef is a point in time where a cycle of wiggling movement starts.
    // it will ends at sway.duration + sway.tRef from then.(when tPassed becomes equal to or larger than sway.duration)
    if (this.sway.tRef === null) {
      this.sway.tRef = Date.now()
    }

    const transformTypes = ['translate', 'scale', 'rotate']
    let tPassed = Date.now() - this.sway.tRef
    switch (this.sway.direction) {
      case 'forward':
        transformTypes.forEach(type => {
          this.sway[type].curr = this.sway[type].ease(tPassed)
        })
        break
      case 'backward':
        transformTypes.forEach(type => {
          this.sway[type].curr = this.sway[type].ease(this.sway.duration - tPassed)
        })
        break
    }

    // the point in time when a cycle of wiggling ends. it merely reverses the direction of movement.
    if (tPassed >= this.sway.duration) {
      this.sway.tRef = Date.now()
      this.sway.direction =
        (this.sway.direction === 'forward') ? 'backward' : 'forward'
    }
  }

  // add the confetti object to the svgCanvas
  add () {
    this.node.innerG.setAttribute('stroke', this.color)
    this.node.innerG.setAttribute('fill', this.color)
    this.node.container.appendChild(this.node.whole)
  }

  // remove confetti object from DOM and cache
  remove () {
    this.node.container.removeChild(
      this.node.whole
    )

    confettis.splice(this.index, 1)
  }

  // as soon as confetti hits a certain y value, reassign the position so it falls from top again.
  positionReset () {
    this.position.x = padding.x + (canvas.width - padding.x * 2) * Math.random()
    this.position.y = utils.randomIntFromRange(CONFETTI_Y_UPPERLIMIT, 0)
  }
}

export function animateSvg (Nodes) {
  const { svgCanvas, bgrect, particles } = Nodes

  // add resize event handler
  resizeHandler = function () {
    init()
  }
  window.addEventListener('resize', resizeHandler)
  // extracts all dom elements of the confetti particles to be used
  Array.prototype.slice
    .call(particles.querySelectorAll('.confetti'))
    .forEach(particle => shapes.push(particle))

  function init () {
    // empty all previous confettis from both cashe and DOM
    confettis = []
    utils.emptyGivenElement(svgCanvas)

    // assign canvas dimension
    canvas.width = bgrect.getBBox().width
    canvas.height = bgrect.getBBox().height

    // Adjust the x-padding and the confetti amount according to the canvas width
    let confettiAmount = Math.floor(confettiAmountScale(canvas.width))
    padding.x = paddingXScale(canvas.width)
    // create a container g for all the confetti particles and append it to the canvas
    confettiContainer = document.createElementNS(xmlns, 'g')
    confettiContainer.setAttributeNS(null, 'id', 'confetti-container')
    svgCanvas.appendChild(confettiContainer)

    // create confetti particles and draw them on the canvas
    for (let i = 0; i < confettiAmount; i++) {
      const confetti = new Confetti(
        padding.x + (canvas.width - padding.x * 2) * Math.random(),
        utils.randomIntFromRange(CONFETTI_Y_UPPERLIMIT, 0),
        i,
        utils.randomColor(confettiColors)
      )

      confetti.add()
      confettis.push(confetti)
    }
  }

  function animate () {
    confettis.forEach(confetti => confetti.update())

    requestId = window.requestAnimationFrame(animate)
  }

  init()
  animate()
}

export function destroyAnimation () {
  window.cancelAnimationFrame(requestId)
  window.removeEventListener('resize', resizeHandler)
}
