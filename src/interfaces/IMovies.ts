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
  category: IMovieCategory;
  createdAt?: Date;
}
