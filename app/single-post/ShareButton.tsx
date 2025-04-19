"use client";

import { Popover , PopoverContent , PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LuShare2 } from "react-icons/lu";

import {
    TwitterShareButton,

    FacebookShareButton,
    FacebookIcon,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon,
    TelegramShareButton,
    TelegramIcon,
    FacebookMessengerShareButton,
    FacebookMessengerIcon
} from 'react-share';

export default function ShareButton({postId , title }: {postId: number , title: string }) {
    const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
    const shareLink = `${url}/property/${postId}`;

  return <Popover >
    <PopoverTrigger asChild>
        <Button variant='outline' size ='icon' className="p-2 text-red-500 hover:text-red-600 dark:text-red-400">
            <LuShare2 />
        </Button>
    </PopoverTrigger>
    <PopoverContent side='top' align='end' sideOffset={10} className="flex items-center gap-x-2 justify-center w-full">

        <WhatsappShareButton url={shareLink} title={title}>
            <span className="inline-block">
                <WhatsappIcon size={32} round />
            </span>
        </WhatsappShareButton>
        <TelegramShareButton url={shareLink} title={title}>
            <span className="inline-block">
                <TelegramIcon size={32} round />
            </span>
        </TelegramShareButton>
        <FacebookShareButton url={shareLink} title={title}>
            <span className="inline-block">
                <FacebookIcon size={32} round />
            </span>
        </FacebookShareButton>

    </PopoverContent>
  </Popover>;
}
