import { cn } from '~/lib/utils';

import SidebarContent from './SidebarContent';
import SidebarDrawer from './SidebarDrawer';
import type { SidebarProps } from './types';

export default function Sidebar(props: SidebarProps) {
  return (
    <>
      <SidebarContent
        {...props}
        className={cn('hidden md:flex', props.className)}
      />
      <SidebarDrawer {...props} />
    </>
  );
}
