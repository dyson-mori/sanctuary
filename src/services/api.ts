import { Video } from "@prisma/client";

import fetcher from "@utils/fetcher";

const api = {
  posts: {
    list: () => fetcher({ method: 'GET', url: '/post' }),
    create: (body: Video) => fetcher({ method: 'POST', url: '/post', body }),
  },
  category: {
    list: () => fetcher({ method: 'GET', url: '/category', cache: 'force-cache' }),
  },
  header: {
    list: () => fetcher({ method: 'GET', url: '/header', cache: 'force-cache' }),
  },
  user: {
    list: () => new Promise(() => []), //fetcher({ method: 'POST', url: '/user', body }),
    find: () => new Promise(() => { }),// fetcher({ method: 'GET', url: '/user/auth' }),
    auth: (value: object) => new Promise(() => value), // fetcher({ method: 'POST', url: '/user/auth', body }),
    create: (value: object) => new Promise(() => !!value) //fetcher({ method: 'POST', url: '/user', body }),
  },
  feed: {
    list: (param?: string) => fetcher({ method: 'GET', url: param ?? '/feed' })
  },
}

export default api;