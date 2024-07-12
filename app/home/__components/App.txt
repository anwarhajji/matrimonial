"use client";

import React from "react";
import {Button, Card, CardBody, CardFooter, ScrollShadow, Spacer} from "@nextui-org/react";

import {AcmeLogo} from "./acme";
import {items} from "./sidebar-items";

import Sidebar from "./sidebar";

/**
 * 💡 TIP: You can use the usePathname hook from Next.js App Router to get the current pathname
 * and use it as the active key for the Sidebar component.
 *
 * ```tsx
 * import {usePathname} from "next/navigation";
 *
 * const pathname = usePathname();
 * const currentPath = pathname.split("/")?.[1]
 *
 * <Sidebar defaultSelectedKey="home" selectedKeys={[currentPath]} />
 * ```
 */
export default function Component() {
  return (
    <div className="h-dvh">
      <div className="h-full w-72 border-r-small border-divider p-6">
        <div className="flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
            <AcmeLogo className="text-background" />
          </div>
          <span className="text-small font-bold uppercase">Acme</span>
        </div>
        <ScrollShadow className="-mr-6 h-full max-h-full py-[10vh] pr-6">
          <Sidebar defaultSelectedKey="home" items={items} />
          <Spacer y={2} />
          <Card className="mx-2 overflow-visible" shadow="sm">
            <CardBody className="items-center py-5 text-center">
              <h3 className="text-medium font-medium text-default-700">
                Upgrade to Pro
                <span aria-label="rocket-emoji" className="ml-2" role="img">
                  🚀
                </span>
              </h3>
              <p className="p-4 text-small text-default-500">
                Get 1 month free and unlock all the features of the pro plan.
              </p>
            </CardBody>
            <CardFooter className="absolute -bottom-8 justify-center">
              <Button className="px-10 shadow-md" color="primary" radius="full" variant="shadow">
                Upgrade
              </Button>
            </CardFooter>
          </Card>
        </ScrollShadow>
      </div>
    </div>
  );
}
