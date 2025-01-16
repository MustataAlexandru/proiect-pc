'use client'

import LoadingContainer from '@/app/global/LoadingContainer'
import LoadingTable from '@/app/global/LoadingTable'
import Spinner from '@/app/global/Spinner'
import React from 'react'

function loading() {
  return (
    <div className='pt-36 pb-36'>
    <Spinner />
    </div>
  )
}

export default loading