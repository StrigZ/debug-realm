import { cn } from '~/lib/utils';

import SidebarGenres from './SidebarGenres';

type Props = { className?: string };
export default function Sidebar({ className }: Props) {
  return (
    <nav className={cn('space-y-8', className)}>
      <SidebarGenres />
    </nav>
  );
}
