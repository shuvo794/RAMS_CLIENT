"use client";

import * as React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu } from "lucide-react";
import { ModeToggle } from "./DarkMode";

import { GET_SERVICE_SLIDER } from "@/lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp, IconName } from "@fortawesome/fontawesome-svg-core";

// const services = [
//   {
//     title: "Software Development",
//     href: "/services/Software-Development",
//     description: " To develop a desired application.",
//     icon: TabletSmartphone,
//   },
//   {
//     title: "Web Application",
//     href: "/services/Web-Application",
//     description: "Custom Web App Development",
//     icon: AppWindow,
//   },
//   {
//     title: "Domain & Hosting",
//     href: "/services/Domain-Hosting",
//     description: "Reliable Domain & Hosting Solutions",
//     icon: ArrowDownUp,
//   },
//   {
//     title: "Digital Marketing",
//     href: "/services/Digital-Marketing",
//     description: "Strategic Online Marketing Solutions",
//     icon: BadgeEuro,
//   },
//   // {
//   //   title: "Dedicated Server Hosting",
//   //   href: "/services/Dedicated-Server-Hosting",
//   //   description: "Secure Dedicated Server Hosting",
//   //   icon: ServerCog,
//   // },
//   // {
//   //   title: "IT Training",
//   //   href: "/services/IT-Training",
//   //   description: "Expert IT Skills Training",
//   //   icon: Satellite,
//   // },
// ];

interface services {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  details: string;
  icon?: string; // <-- notice it's now optional `?`
  serial_number: number;
  slug?: string;
}

export default function NavbarSection() {
  const [serviceSliders, setServiceSliders] = useState<services[]>([]);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [open, setOpen] = useState(false); // Control sheet state
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleClose = () => setOpen(false);
  // const [,setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  console.log("serviceSliders", serviceSliders);

  const parseIconString = (iconString: string): IconProp => {
    if (!iconString) return ["fas", "circle-info"];

    // Handle strings like "fa-solid fa-globe" or "fas fa-globe"
    const parts = iconString.split(" ");

    if (parts.length === 2) {
      // Convert "fa-solid" or "fas" to "fas"
      let prefix = parts[0].replace("fa-", "");
      if (prefix === "solid") prefix = "fas";
      if (prefix === "regular") prefix = "far";
      if (prefix === "brands") prefix = "fab";

      // Remove "fa-" prefix from icon name
      const iconName = parts[1].replace("fa-", "");

      return [prefix as "fas" | "far" | "fab", iconName as IconName];
    }

    // Fallback for invalid format
    return ["fas", "circle-info"];
  };
  useEffect(() => {
    const fetchServiceSliders = async () => {
      try {
        const response = await fetch(GET_SERVICE_SLIDER);
        if (!response.ok) {
          throw new Error("Failed to fetch service sliders");
        }
        const data = await response.json();
        if (data && data.service_sliders) {
          // Sort by serial_number
          const sortedSliders = [...data.service_sliders].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setServiceSliders(sortedSliders);
        }
      } catch (err) {
        console.error("Error fetching service sliders:", err);
        setError("Failed to load services");
      } finally {
        // setIsLoading(false);
      }
    };

    fetchServiceSliders();
  }, []);
  return (
    <div className="sticky top-0 z-50 bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/bbit.png" alt="RAMS Logo" width={50} height={70} />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  HOME
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/About" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  ABOUT
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/services">
                <NavigationMenuTrigger>Client</NavigationMenuTrigger>
              </Link>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[600px]">
                  {serviceSliders.map((service) => {
                    return (
                      <ListItem
                        key={service.title}
                        title={
                          <span className="flex items-center gap-2">
                            {service.icon && (
                              <FontAwesomeIcon
                                icon={parseIconString(service.icon)}
                                size="2x"
                                className="text-[#0066FF]  group-hover:text-white"
                              />
                            )}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: service.title,
                              }}
                            />
                          </span>
                        }
                        href={service.slug ? `/services/${service.slug}` : "#"}
                      >
                        {service.subtitle}
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/portfolio" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Blog
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/Clients" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Priceing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* <NavigationMenuItem>
              <Link href="/gallery" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  GALLERY
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem> */}

            <NavigationMenuItem>
              <Link href="/contactus" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  CONTACT US
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
            <nav className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {/* Main Links */}
                <Link
                  href="/"
                  onClick={handleClose}
                  className="block px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                >
                  HOME
                </Link>
                <Link
                  href="/About"
                  onClick={handleClose}
                  className="block px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                >
                  ABOUT
                </Link>

                {/* Services Collapsible */}
                <div className="space-y-1">
                  <button
                    className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                    onClick={() => setServicesExpanded(!servicesExpanded)}
                  >
                    <span>Services</span>
                    <span>{servicesExpanded ? "-" : "+"}</span>
                  </button>

                  {servicesExpanded && (
                    <div className="space-y-2 pl-4">
                      {serviceSliders.map((service) => (
                        <Link
                          key={service.title}
                          href={
                            service.slug ? `/services/${service.slug}` : "#"
                          }
                          onClick={handleClose}
                          className="block px-3 py-2 text-sm rounded-md hover:bg-accent"
                        >
                          <span className="flex items-center gap-2">
                            {service.icon && (
                              <FontAwesomeIcon
                                icon={parseIconString(service.icon)}
                                size="lg"
                                className="text-[#0066FF]"
                              />
                            )}
                            <div
                              dangerouslySetInnerHTML={{
                                __html: service.title,
                              }}
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Other Links */}
                <Link
                  href="/portfolio"
                  onClick={handleClose}
                  className="block px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                >
                  PORTFOLIO
                </Link>
                <Link
                  href="/Clients"
                  onClick={handleClose}
                  className="block px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                >
                  CLIENTS
                </Link>
                <Link
                  href="/gallery"
                  onClick={handleClose}
                  className="block px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                >
                  GALLERY
                </Link>
                <Link
                  href="/contactus"
                  onClick={handleClose}
                  className="block px-3 py-2 text-sm font-bold uppercase rounded-md hover:bg-accent"
                >
                  CONTACT US
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

interface ListItemProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Link>, "title"> {
  title: React.ReactNode;
  children: React.ReactNode;
}

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";
