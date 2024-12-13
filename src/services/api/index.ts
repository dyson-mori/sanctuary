import { fetcher } from "@utils";

import { ApiProps } from './types'

export const api: ApiProps = {
  posts: {
    list: () => fetcher({ url: '/post', method: 'GET' })
  },

  creator: {
    find: (name) => fetcher({ url: `/creator?name=${name}`, method: 'GET' }),
  },

  search: {
    list: () => fetcher({ url: '/search', method: 'GET' }),
  },

  category: {
    list: () => fetcher({ url: `/category`, method: 'GET' }),
  },
};
