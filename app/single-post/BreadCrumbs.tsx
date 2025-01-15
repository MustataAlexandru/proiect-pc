import React from 'react'

import { Breadcrumb , BreadcrumbItem , BreadcrumbLink, BreadcrumbList ,BreadcrumbPage , BreadcrumbSeparator } from '@/components/ui/breadcrumb'

export default function BreadCrumbs({name} : {name: string}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='/' className='capitalize text-lg'>home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='/products' className='capitalize text-lg'>product</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
         <BreadcrumbPage className='capitalize text-lage'>
          {name}
         </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
