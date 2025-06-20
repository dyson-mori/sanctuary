export type PostProps = {
  id: string;
  url: string;
  preview: string;
  width: number;
  height: number;
  viewer: number;
  price: number;

  like: boolean;

  created_at: string;
  updated_at: string;

  isPrivate: boolean,

  comments: CommentsProps[];
  categories: {
    title: string;
  }[],

  _count: {
    likes: number;
    comments: number;
  };
};

export type CategoryProps = {
  id: string;
  title: string;
  _count: {
    video: number;
  }
};

export type HeaderProps = {
  title: string;
  param: string;
};

export type CommentsProps = {
  user: UserProps
  content: string;
};

export type UserProps = {
  photo: string;
  nickname: string;
  // posts: PostProps[];
  // likes: PostProps[],
  // _count: {
  //   post: number;
  //   likes: number;
  // };
};