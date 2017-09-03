import React from 'react'

import Button from './Button'
import CircularProgress from './CircularProgress'

const PrimaryButton = props => (
  <Button {...props} color='white' bgColor='#4494e3' hoverBgColor='#3572b0' borderColor={null} style={{lineHeight: 'normal', padding: '1rem', letterSpacing: '0.04rem', ...props.style}}>
    {props.loading ? (
      <CircularProgress size={15} thickness={2} color='white' />
    ) : (
      <span>
        {props.children}    
      </span>
    )}
  </Button>
)

export default PrimaryButton
