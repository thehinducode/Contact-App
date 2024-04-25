import * as React from 'react'
const DeleteButton = (props: React.SVGProps<SVGSVGElement>) => {
  const { height, width, color, ...rest } = props

  return (
    <svg
      fill={color}
      id='Layer_1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      width={width}
      height={height}
      viewBox='0 0 48.295 48.257'
      xmlSpace='preserve'
      {...rest}
    >
      <path d='M24.147,0C10.812,0,0,10.8,0,24.127c0,13.326,10.812,24.13,24.147,24.13c13.334,0,24.148-10.805,24.148-24.13 C48.295,10.8,37.481,0,24.147,0z M39.485,27.996h-0.002c0,1.008-0.817,1.824-1.825,1.824H10.637c-1.007,0-1.826-0.816-1.826-1.824 v-7.739c0-1.006,0.818-1.82,1.826-1.82h27.022c1.007,0,1.826,0.814,1.826,1.82V27.996z' />
    </svg>
  )
}
export default DeleteButton
