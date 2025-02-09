export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  tba: boolean;
  background_image?: string;
  rating: number;
  rating_top: number;
  ratings: {
    id: number;
    title: string;
    count: number;
    percent: string;
  }[];
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
  };
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  platforms: [
    {
      platform: {
        id: number;
        slug: string;
        name: string;
      };
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    },
  ];
  parentPlatform: {
    platform: { id: number; name: string; slug: string };
  }[];
  genres: Genre[];
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
      games_count: number;
      image_background: string;
    };
  }[];
  clip: string | null;
  tags: {
    id: number;
    name: string;
    slug: string;
    language: string;
    games_count: number;
    image_background: string;
  }[];
  esrb_rating: {
    id: number;
    slug: string;
    name: string;
  };
  short_screenshots: {
    id: number;
    image: string;
  }[];
};

export type Genre = {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
};

export type APIResponse = {
  count: number;
  next: string;
  previous: string;
  results: unknown[];
};

export type UrlParams = 'sort' | 'date' | 'genres';
export type UrlParamsDatesValue = 'week' | 'month' | 'year' | 'all time';
export type UrlParamsSortValue = 'name' | 'rating' | 'released' | 'metacritic';
