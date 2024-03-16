"use client";
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useStoreModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

const SetupPage = () =>{
  const isOpen = useStoreModal((state) => state.isOpen);
  const onOpen = useStoreModal((state) => state.onOpen);

  useEffect(()=>{
    if(!isOpen)
    {
      onOpen();
    }
  },[isOpen,onOpen]);

  return null;  
}

export default SetupPage;
