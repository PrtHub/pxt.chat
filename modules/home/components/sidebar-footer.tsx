"use client";

import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import { User, LogIn } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@/hooks/use-user";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const SidebarFooterSection = () => {
  const { user, isLoading, isAuthenticated } = useUser();
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (user?.image) {
      setImageSrc(user.image);
      setImageError(false);
    }
  }, [user?.image]);

  const GITHUB_URL = "https://github.com/PrtHub/pxt.chat";

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 p-2 w-full">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="space-y-1 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href="/auth" className="w-full">
        <Button
          variant="ghost"
          className={cn(
            "w-full h-10 justify-start gap-2 cursor-pointer",
            "hover:bg-gradient-to-br hover:from-zinc-800 hover:to-zinc-900"
          )}
        >
          <LogIn className="h-4 w-4" />
          <span className="">Login</span>
        </Button>
      </Link>
    );
  }

  const handleImageError = () => {
    setImageError(true);
    setImageSrc(undefined);
  };

  return (
    <div className="flex items-center gap-3 w-full">
      <Link href={`/profile/${user?.id}`} className="flex items-center gap-3 flex-1 min-w-0">
        <Avatar className="h-8 w-8 group-data-[collapsible=icon]:opacity-0 transition-opacity duration-500 ease-in-out">
          {imageSrc && !imageError ? (
            <div className="relative h-full w-full">
              <Image
                src={imageSrc}
                alt={user?.name || "User"}
                fill
                className="object-cover"
                onError={handleImageError}
                unoptimized={imageSrc.includes('googleusercontent.com')}
                referrerPolicy="no-referrer"
                priority
              />
            </div>
          ) : (
            <AvatarFallback className="bg-zinc-800">
              <User className="h-4 w-4 text-zinc-400" />
            </AvatarFallback>
          )}
        </Avatar>
        <div className="group-data-[collapsible=icon]:opacity-0 group-data-[collapsible=icon]:hidden transition-opacity duration-500 ease-in-out min-w-0">
          <p className="text-sm font-medium whitespace-nowrap truncate">
            {user?.name || "User"}
          </p>
          <p className="text-xs text-gray-400 whitespace-nowrap truncate">
            {user?.email?.split("@")[0] || "Free"}
          </p>
        </div>
      </Link>
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto p-1 rounded hover:bg-zinc-800 transition-colors"
            aria-label="View source code"
          >
            <FaGithub  className="h-5 w-5 text-zinc-400 hover:text-white" />
          </a>
        </TooltipTrigger>
        <TooltipContent side="top">
          <span>Source code</span>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default SidebarFooterSection;
