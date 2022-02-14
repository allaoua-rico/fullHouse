import { Tooltip } from '@mui/material'
import React from 'react'
import Facebook from './svg/Facebook'
import Instagram from './svg/Instagram'

export default function Footer() {
  return (
    <div className='h-20 bg-pink-100 flex justify-center items-center gap-x-8'>
        <Tooltip title="Visitez notre page Facebook">
        <a href='https://www.facebook.com/Full-House-deco-103113092208751/'>
            <Facebook className='fill-white scale-[1.7] stroke-pink-300 stroke-1'/>
        </a>
        </Tooltip>
        <Tooltip title="Visitez notre page Instagram">
        <a href='https://www.instagram.com/full.house.deco/'>
            <Instagram className='fill-white scale-[1.7] stroke-pink-300 stroke-1'/>
        </a>
        </Tooltip>
    </div>
  )
}
