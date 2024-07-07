"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";

export const Navbar = () => {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path ? "text-foreground" : "text-muted-foreground";
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden w-full justify-between md:flex md:flex-row md:items-center">
          <div className="flex items-center justify-center gap-2 text-lg font-semibold md:text-base">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256.8 311.75"
              className="h-6 w-6"
            >
              <rect width="256.8" height="311.75" fill="none"></rect>
              <path
                d="M226,67.33a15.21,15.21,0,0,0,3-9.14V4.37c0-3-1.39-4.37-4.37-4.37H31.38A4.89,4.89,0,0,0,28.2,1.19,4.55,4.55,0,0,0,27,4.37V251.63a4.55,4.55,0,0,0,1.19,3.18A4.89,4.89,0,0,0,31.38,256H224.62c3,0,4.37-1.39,4.37-4.37V197.81a15.21,15.21,0,0,0-3-9.14L179.14,128.1v-.2Zm-106,62,29,37.93,32.18,42.31H73.88V46.47H181.13L149,88.78l-29,37.93-1,1.39Z"
                transform="translate(27.81 55.75)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="items-center ">Balorank</span>
          </div>
          <div className="flex flex-row gap-6">
            <Link
              href="/"
              className={`transition-colors hover:text-foreground ${getLinkClass(
                "/"
              )}`}
            >
              Home
            </Link>
            <Link
              href="/Agents"
              className={`transition-colors hover:text-foreground ${getLinkClass(
                "/Agents"
              )}`}
            >
              Agents
            </Link>
            <Link
              href="/Weapons"
              className={`transition-colors hover:text-foreground ${getLinkClass(
                "/Weapons"
              )}`}
            >
              Weapons
            </Link>
            <Link
              href="/Maps"
              className={`transition-colors hover:text-foreground ${getLinkClass(
                "/Maps"
              )}`}
            >
              Maps
            </Link>
          </div>
          <ModeToggle />
        </nav>

        <Sheet>
          <div className="flex justify-between w-full md:hidden">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <div className="flex items-center justify-center gap-2 text-lg font-semibold md:text-base">
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256.8 311.75"
              className="h-6 w-6"
            >
              <rect width="256.8" height="311.75" fill="none"></rect>
              <path
                d="M226,67.33a15.21,15.21,0,0,0,3-9.14V4.37c0-3-1.39-4.37-4.37-4.37H31.38A4.89,4.89,0,0,0,28.2,1.19,4.55,4.55,0,0,0,27,4.37V251.63a4.55,4.55,0,0,0,1.19,3.18A4.89,4.89,0,0,0,31.38,256H224.62c3,0,4.37-1.39,4.37-4.37V197.81a15.21,15.21,0,0,0-3-9.14L179.14,128.1v-.2Zm-106,62,29,37.93,32.18,42.31H73.88V46.47H181.13L149,88.78l-29,37.93-1,1.39Z"
                transform="translate(27.81 55.75)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
              />
            </svg>
            <span className="items-center ">Balorank</span>
          </div>
          <ModeToggle />
          </div>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <svg
                  id="Layer_1"
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256.8 311.75"
                  className="h-6 w-6"
                >
                  <rect width="256.8" height="311.75" fill="none"></rect>
                  <path
                    d="M226,67.33a15.21,15.21,0,0,0,3-9.14V4.37c0-3-1.39-4.37-4.37-4.37H31.38A4.89,4.89,0,0,0,28.2,1.19,4.55,4.55,0,0,0,27,4.37V251.63a4.55,4.55,0,0,0,1.19,3.18A4.89,4.89,0,0,0,31.38,256H224.62c3,0,4.37-1.39,4.37-4.37V197.81a15.21,15.21,0,0,0-3-9.14L179.14,128.1v-.2Zm-106,62,29,37.93,32.18,42.31H73.88V46.47H181.13L149,88.78l-29,37.93-1,1.39Z"
                    transform="translate(27.81 55.75)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="16"
                  />
                </svg>
                <span className="">Balorank</span>
              </div>
              <Link
                href="/"
                className={`hover:text-foreground ${getLinkClass("/")}`}
              >
                Home
              </Link>
              <Link
                href="/Agents"
                className={`hover:text-foreground ${getLinkClass("/Agents")}`}
              >
                Agents
              </Link>
              <Link
                href="/Weapons"
                className={`hover:text-foreground ${getLinkClass("/Weapons")}`}
              >
                Weapons
              </Link>
              <Link
                href="/Maps"
                className={`hover:text-foreground ${getLinkClass("/Maps")}`}
              >
                Maps
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>
    </>
  );
};
