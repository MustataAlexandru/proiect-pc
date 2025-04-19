'use client';
import React from 'react';

import { SignOutButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';


function SignOutLink() {
  const {toast} = useToast();
  const router = useRouter();

  const handleLogout = () => {
    toast({title: 'Logout Successful'});
    router.push('/');
  }

  return (
    <SignOutButton signOutCallback={handleLogout}>
      <span className='w-full text-left block cursor-pointer'>Logout</span>
    </SignOutButton>
  )
}

export default SignOutLink