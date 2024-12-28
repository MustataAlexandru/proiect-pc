import React from 'react'

function page({params} : {params: {id: string}}) {
  return (
    <div className='mt-10'>post with the id of {params.id}</div>
  )
}

export default page