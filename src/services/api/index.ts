import { fetcher } from "@utils";

import { ApiProps } from './types'

export const api: ApiProps = {
  posts: {
    list: () => fetcher({ url: '/post', method: 'GET' }),
    create: (body) => fetcher({ url: '/post', method: 'POST', body }),
  },

  creator: {
    list: () => fetcher({ url: '/creator', method: 'GET' }),
    find: (name) => fetcher({ url: `/creator?name=${name}`, method: 'GET' }),
    create: (body) => fetcher({ url: '/creator', method: 'POST', body }),
  },

  search: {
    list: () => fetcher({ url: '/search', method: 'GET' }),
  },

  category: {
    list: () => fetcher({ url: `/category`, method: 'GET' }),
    create: (body) => fetcher({ url: `/category`, method: 'POST', body }),
  },
};
