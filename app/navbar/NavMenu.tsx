import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"


export default async function Nav() {
  
  
  return (
    <NavigationMenu className="dark:bg-transparent dark:text-white" >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="dark:bg-transparent">Despre</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="col-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Vissionary Lab
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Proiect PC 2024-2025
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/introduction" title="Introducere">
                Next.js + typescript - Server and client side components
              </ListItem>
              <ListItem href="/dependencies" title="Install">
                Toate dependintele si framework-urile folosite
              </ListItem>
              <ListItem href="/docs" title="Docs">
                @Documentatie
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Membrii</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:grid-cols-3 md:grid-cols-2 lg:w-[900px] ">
            
              <Link href={'/'}>
              <ListItem
              key = {1}
              title={'Mogoseanu Alexandru'}>Technical Writer</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {2}
              title={'Mustata Alexandru-Cristian'}>Developer</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {3}
              title={'Lacraru Bianca'}>QA / Tester</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {4}
              title={'Mitrica Razvana'}>QA / Tester</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {5}
              title={'Georgescu Alexandra'}>UI / UX Designer</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {6}
              title={'Trasca Robert'}>Developer</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {7}
              title={'Patrascu Radu'}>Business Analyst</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {8}
              title={'Ruicu Andrei'}>Customer Support</ListItem>
              </Link>
              <Link href={'/'}>
              <ListItem
              key = {9}
              title={'Dinita Loredana'}>IT Talent Seeker</ListItem>
              </Link>
              
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
       
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
