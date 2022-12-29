export default {};

// import { api } from "../emptyApi";
// const injectedRtkApi = api.injectEndpoints({
//   endpoints: (build) => ({
//     getSearchByFilters: build.query<
//       GetSearchByFiltersApiResponse,
//       GetSearchByFiltersApiArg
//     >({
//       query: (queryArg) => ({ url: `/search/${queryArg.filters}` }),
//     }),
//   }),
//   overrideExisting: false,
// });
// export { injectedRtkApi as searchApi };
// export type GetSearchByFiltersApiResponse =
//   /** status 200 OK */ SearchResultItem;
// export type GetSearchByFiltersApiArg = {
//   filters: SearchRequestItem;
// };
// export type SearchResultItem = {
//   SearchResultItemSubject?: any;
// };
// export type SearchRequestItem = {
//   Id?: number;
// };
// export const { useGetSearchByFiltersQuery } = injectedRtkApi;
