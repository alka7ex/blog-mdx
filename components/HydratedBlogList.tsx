import { dehydrate } from '@tanstack/query-core';
import getQueryClient from '@/app/utils/getQueryClient';
import BlogListWithPagination from './BlogList';
import ReactQueryHydrate from '@/app/utils/HydrateClient';
import { dataPagination } from '@/app/api/fetch';
import BlogList from './BlogList';

const HydratedPosts = async () => {
    const { page } = await dataPagination();
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
        queryKey: ['projects', page],
        queryFn: dataPagination,
        staleTime: 100000,
        cacheTime: 100000,
      })
    
    const dehydratedState = dehydrate(queryClient);

    return (
        <ReactQueryHydrate state={dehydratedState}>
            <BlogList/>
        </ReactQueryHydrate>
    );
};
export default HydratedPosts;
