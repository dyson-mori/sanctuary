import { fetcher } from "@utils";

import { ApiProps } from './types'

export const api: ApiProps = {
  user: {
    list: () => fetcher({ url: '/user', method: 'GET' }),
    create: (body) => fetcher({ url: '/user', method: 'POST', body })
  },
  auth: {
    find: () => fetcher({ url: '/user/auth', method: 'GET', next: { tags: ['auth'] } }),
    auth: (body) => fetcher({ url: '/user/auth', method: 'POST', body }),
  },
  post: {
    list: () => fetcher({ url: '/post', method: 'GET', next: { tags: ['post'] } }),
    create: (body) => fetcher({ url: '/post', method: 'POST', body }),
    update: (param, body) => fetcher({ url: '/post', method: 'PUT', body, param }),
    delete: (param) => fetcher({ url: '/post', method: 'DELETE', param })
  },

  search: {
    list: (id) => fetcher({ url: `/search?id=${id}`, method: 'GET' }),
  },

  category: {
    list: () => fetcher({ url: `/category`, method: 'GET' }),
    create: (body) => fetcher({ url: `/category`, method: 'POST', body }),
  },
};
