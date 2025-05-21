"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp, IconName } from "@fortawesome/fontawesome-svg-core";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Service {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  details: string;
  icon?: string;
  serial_number: number;
  slug?: string;
}

export default function NavbarSection() {
  const [serviceSliders] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<string | { name?: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    if (userName) {
      try {
        setUser(JSON?.parse(userName));
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
        setUser(userName);
      }
    }
  }, []);

  const parseIconString = (iconString: string): IconProp => {
    if (!iconString) return ["fas", "circle-info"];
    const parts = iconString.split(" ");
    if (parts.length === 2) {
      let prefix = parts[0].replace("fa-", "");
      if (prefix === "solid") prefix = "fas";
      if (prefix === "regular") prefix = "far";
      if (prefix === "brands") prefix = "fab";
      const iconName = parts[1].replace("fa-", "");
      return [prefix as "fas" | "far" | "fab", iconName as IconName];
    }
    return ["fas", "circle-info"];
  };

  const handleSignOut = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <>
      <style>
        {`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        `}
      </style>

      <header
        className={cn(
          "w-full z-50 transition-all duration-300",
          isScrolled
            ? "fixed top-0 bg-white shadow animate-slideDown"
            : "fixed top-0 bg-transparent text-white"
        )}
      >
        <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/RAMSNew(2).png" alt="Logo" width={150} height={80} />
          </Link>

          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="flex gap-1">
              {[
                { href: "/", label: "HOME" },
                { href: "/Blog", label: "BLOG" },
                { href: "/pricing", label: "PRICING" },
                { href: "/Clients", label: "ClIENTS" },
                { href: "/contactus", label: "CONTACT US" },
              ].map(({ href, label }) => (
                <NavigationMenuItem key={label}>
                  <Link href={href} passHref legacyBehavior>
                    <NavigationMenuLink className="inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium hover:bg-black-100">
                      {label}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 grid-cols-2">
                    {serviceSliders.map((service) => (
                      <li key={service.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={
                              service.slug ? `/services/${service.slug}` : "#"
                            }
                            className="block p-3 rounded-md hover:bg-gray-100 transition"
                          >
                            <div className="text-sm font-medium mb-1 flex items-center gap-2">
                              {service.icon && (
                                <FontAwesomeIcon
                                  icon={parseIconString(service.icon)}
                                  className="text-blue-600"
                                />
                              )}
                              <span
                                dangerouslySetInnerHTML={{
                                  __html: service.title,
                                }}
                              />
                            </div>
                            <div className="text-sm text-muted-foreground line-clamp-2">
                              {service.subtitle}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            {user && (
              <h2 className="text-blue-500 font-bold">
                {typeof user === "string"
                  ? user
                  : user && "name" in user
                  ? user.name
                  : "User"}
              </h2>
            )}

            {user ? (
              <Button
                onClick={handleSignOut}
                className="bg-white text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-blue-500 transition-all duration-200 rounded-md px-6 py-2 text-sm font-medium"
              >
                Sign Out
              </Button>
            ) : (
              <Link href="/Signin" passHref legacyBehavior>
                <Button className="bg-white text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-blue-500 transition-all duration-200 rounded-md px-6 py-2 text-sm font-medium">
                  Sign In
                </Button>
              </Link>
            )}

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="flex flex-col gap-4 mt-4">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/Blog", label: "Blog" },
                    { href: "/pricing", label: "Pricing" },
                    { href: "/Clients", label: "ClIENTS" },
                    { href: "/contactus", label: "Contact Us" },
                  ].map(({ href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      className="block px-3 py-2 font-semibold uppercase rounded hover:bg-gray-100"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
