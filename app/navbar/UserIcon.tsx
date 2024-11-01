import React from 'react';
import { LuUser2 } from 'react-icons/lu';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';

async function UserIcon() {
  // const {userId} = auth();
  const user = await currentUser();
  const profileImage = user?.imageUrl;
  
  if(profileImage){
    return <Image src={profileImage} alt='user profile' className='w-6 h-6 rounded-full object-cover' />
  }
  return (
    <LuUser2 className='w-6 h-6 bg-primary rounded-full text-white'/>
  )
}

export default UserIcon