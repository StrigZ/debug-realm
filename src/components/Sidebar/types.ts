import type { Genre, UrlParams } from '~/types';

export type SidebarProps = {
  genres: Genre[];
  isLoading: boolean;
  activeGenre: string | null;
  className?: string;
  handleFilterChange: (param: UrlParams, value: string) => void;
};
