import React, { Component } from 'react'

const transitions = {
  easeOutFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
  easeInOutFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',

  easeOut(duration, property, delay, easeFunction) {
    easeFunction = easeFunction || this.easeOutFunction
    if (property && Object.prototype.toString.call(property) === '[object Array]') {
      let transitions = ''
      for (let i = 0; i < property.length; i++) {
        if (transitions) transitions += ','
        transitions += this.create(duration, property[i], delay, easeFunction)
      }
      return transitions
    } else {
      return this.create(duration, property, delay, easeFunction)
    }
  },

  create(duration, property, delay, easeFunction) {
    duration = duration || '450ms'
    property = property || 'all'
    delay = delay || '0ms'
    easeFunction = easeFunction || 'linear'
    return `${property} ${duration} ${easeFunction} ${delay}`
  },
}

const autoPrefix = {
  set(style, key, value) {
    style[key] = value
  },
}

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max)
  return clampedValue / (max - min)
}

function getArcLength(fraction, props) {
  return fraction * Math.PI * (props.size - props.thickness)
}

function getStyles(props) {
  const {max, min, size, value} = props

  const styles = {
    root: {
      position: 'relative',
      display: 'inline-block',
      width: size,
      height: size,
    },
    wrapper: {
      width: size,
      height: size,
      display: 'inline-block',
      transition: transitions.create('transform', '20s', null, 'linear'),
      transitionTimingFunction: 'linear',
    },
    svg: {
      width: size,
      height: size,
      position: 'relative',
    },
    path: {
      stroke: props.color,
      strokeLinecap: 'round',
      transition: transitions.create('all', '1.5s', null, 'ease-in-out'),
    },
  }

  if (props.mode === 'determinate') {
    const relVal = getRelativeValue(value, min, max)
    styles.path.transition = transitions.create('all', '0.3s', null, 'linear')
    styles.path.strokeDasharray = `${getArcLength(relVal, props)}, ${getArcLength(1, props)}`
  }

  return styles
}

export default class CircularProgress extends Component {

  static defaultProps = {
    mode: 'indeterminate',
    value: 0,
    min: 0,
    max: 100,
    size: 40,
    thickness: 3.5,
    color: 'black'
  }

  componentDidMount() {
    this.scalePath(this.refs.path)
    this.rotateWrapper(this.refs.wrapper)
  }

  componentWillUnmount() {
    clearTimeout(this.scalePathTimer)
    clearTimeout(this.rotateWrapperTimer)
  }

  scalePath(path, step = 0) {
    if (this.props.mode !== 'indeterminate') return

    step %= 3

    if (step === 0) {
      path.style.strokeDasharray = `${getArcLength(0, this.props)}, ${getArcLength(1, this.props)}`
      path.style.strokeDashoffset = 0
      path.style.transitionDuration = '0ms'
    } else if (step === 1) {
      path.style.strokeDasharray = `${getArcLength(0.7, this.props)}, ${getArcLength(1, this.props)}`
      path.style.strokeDashoffset = getArcLength(-0.3, this.props)
      path.style.transitionDuration = '750ms'
    } else {
      path.style.strokeDasharray = `${getArcLength(0.7, this.props)}, ${getArcLength(1, this.props)}`
      path.style.strokeDashoffset = getArcLength(-1, this.props)
      path.style.transitionDuration = '850ms'
    }

    this.scalePathTimer = setTimeout(() => this.scalePath(path, step + 1), step ? 750 : 250)
  }

  rotateWrapper(wrapper) {
    if (this.props.mode !== 'indeterminate') return

    autoPrefix.set(wrapper.style, 'transform', 'rotate(0deg)')
    autoPrefix.set(wrapper.style, 'transitionDuration', '0ms')

    setTimeout(() => {
      autoPrefix.set(wrapper.style, 'transform', 'rotate(1800deg)')
      autoPrefix.set(wrapper.style, 'transitionDuration', '10s')
      autoPrefix.set(wrapper.style, 'transitionTimingFunction', 'linear')
    }, 50)

    this.rotateWrapperTimer = setTimeout(() => this.rotateWrapper(wrapper), 10050)
  }

  render() {
    const {size, thickness, ...other} = this.props
    const styles = getStyles(this.props)

    const style = {
      position: 'relative',
      display: 'inline-block',
      width: `${size}px`,
      height: `${size}px`,
      lineHeight: 0,
      ...this.props.style
    }

    const innerStyle = {
      display: 'inline-block',
      transition: 'transform 10s linear 0ms',
      transform: 'rotate(1800deg)',
      width: `${size}px`,
      height: `${size}px`,
      ...this.props.innerStyle
    }

    const svgStyle = {
      position: 'relative',
      width: `${size}px`,
      height: `${size}px`,
    }

    return (
      <div {...other} style={style}>
        <div ref='wrapper' style={innerStyle}>
          <svg
            viewBox={`0 0 ${size} ${size}`}
            style={svgStyle}
          >
            <circle
              ref='path'
              style={styles.path}
              cx={size / 2}
              cy={size / 2}
              r={(size - thickness) / 2}
              fill='none'
              strokeWidth={thickness}
              strokeMiterlimit='20'
            />
          </svg>
        </div>
      </div>
    )
  }
}
