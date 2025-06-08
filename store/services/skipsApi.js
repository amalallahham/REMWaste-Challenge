import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const skipsApi = createApi({
  reducerPath: 'skipsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://app.wewantwaste.co.uk/api/' }),
  endpoints: (builder) => ({
    getSkipsByLocation: builder.query({
      query: ({ postcode, area }) =>
        `skips/by-location?postcode=${postcode}&area=${area}`,
    }),
  }),
});

export const { useGetSkipsByLocationQuery } = skipsApi;
