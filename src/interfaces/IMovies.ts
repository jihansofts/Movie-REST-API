export interface IMovieCategory {
  id: string;
  CategoryName: string;
  createdAt?: Date;
}

export interface IMovie {
  id: string;
  title: string;
  images: string[];
  description: string;
  dowloadlink: string;
  steamLink: string;
  sceenShots: string[];
  movieCategory: IMovieCategory[];
  createdAt?: Date;
}
