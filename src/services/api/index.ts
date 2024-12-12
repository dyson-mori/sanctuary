import { fetcher } from "@utils";

import { ApiProps } from './types'

export const api: ApiProps = {
  posts: {
    list: async () => {
      const data = await fetcher({
        url: '/post',
        method: 'GET',
        next: {
          tags: ['posts']
        },
      });

      return data
    },
    filter: async (name) => {
      const url = `/post${name ? '?name=' + name : ''}`;
      return fetcher({ url, method: 'GET' });
    },
  },

  creator: {
    find: async (name) => {
      const res = await fetch(`${process.env.NEXTBASE_URL}/creator?name=${name}`, {
        method: 'GET',
        cache: 'no-store'
      });

      if (!res.ok) {
        return {
          notFound: true,
        }
      };

      return res.json();
    }
  },

  search: {
    list: () => fetcher({
      url: `/post`,
      // url: `/post${name ? '?name=' + name : ''}`,
      method: 'GET',
    }),

    filter: async (body) =>
      await fetch(`${process.env.NEXTBASE_URL}/search`,
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(body)
        }
      )
        .then(jsn => jsn.json())
  },

  category: {
    list: async () => {
      const res = await fetch(`${process.env.NEXTBASE_URL}/category`, {
        method: 'GET',
        cache: 'no-store'
      });

      if (!res.ok) {
        return {
          notFound: true,
        }
      };

      return res.json();
    }
  },
};
