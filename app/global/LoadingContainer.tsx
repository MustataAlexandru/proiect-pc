import React from 'react';
import { Card , CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Spinner from './Spinner';


export default function LoadingContainer() {
  return (
    <div className='pt-36 pb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card><Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card><Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card><Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card>
  <Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card>
  <Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card>
  <Card>
    <CardContent className='p-4'>
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card>
    </div>
  )
}

export function LoadingProduct() {
  return <Card>
    <CardContent className='p-4'>
      <Spinner />
      <Skeleton className='h-48 w-full'></Skeleton>
      <Skeleton className='h-4 w-3/4 mt-4'></Skeleton>
      <Skeleton className='h-4 w-1/2 mt-4'></Skeleton>
    </CardContent>
  </Card>
}

