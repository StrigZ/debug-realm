import { cn } from '~/utils/utils';

import SidebarGenres from './SidebarGenres';
import SidebarLinks from './SidebarLinks';

type Props = { className?: string };
export default function Sidebar({ className }: Props) {
  return (
    <nav className={cn('space-y-8', className)}>
      <SidebarLinks />
      <SidebarGenres />
    </nav>
  );
}
