'use client'

// React Imports
import { forwardRef } from 'react'

// Next Imports
import NextLink from 'next/link'

const Link = (props, ref) => {
  // Props
  const { href, onClick, ...rest } = props

  // Only render the link if href is defined or fallback to '/'
  // const safeHref = typeof href === 'string' || typeof href === 'object' ? href : '/'

  return (
    <NextLink
      ref={ref}
      {...rest}
      href={href || '/'}
      // href={safeHref}
      onClick={onClick ? e => onClick(e) : !href ? e => e.preventDefault() : undefined}
    />
  )
}

export default forwardRef(Link)
