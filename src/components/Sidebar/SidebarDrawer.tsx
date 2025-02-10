import { Filter, X } from 'lucide-react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import SidebarContent from './SidebarContent';
import type { SidebarProps } from './types';

export default function SidebarDrawer(props: SidebarProps) {
  return (
    <Drawer direction="bottom">
      <DrawerTrigger className="fixed bottom-4 left-4 z-50 flex items-center justify-center rounded-full bg-white p-4 transition-transform hover:scale-110 active:scale-95 md:hidden">
        <Filter className="text-slate-950" />
      </DrawerTrigger>
      <DrawerOverlay className="fixed inset-0 bg-black/40" />
      <DrawerContent className="mt-0 h-[min(50vh,450px)] w-full rounded-none">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-3xl">Genres</DrawerTitle>
          <DrawerClose asChild className="cursor-pointer">
            <X />
          </DrawerClose>
        </DrawerHeader>
        <SidebarContent {...props} />
      </DrawerContent>
    </Drawer>
  );
}
