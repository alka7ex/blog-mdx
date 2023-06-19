import { dehydrate } from '@tanstack/query-core';
import getQueryClient from '@/app/utils/getQueryClient';
import BlogListWithPagination from './BlogList';
import ReactQueryHydrate from '@/app/utils/HydrateClient';
import { dataPagination } from '@/app/api/fetch';

const HydratedPosts = async () => {
    const { page } = await dataPagination();
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery(['projects', page],dataPagination,
    )

    const dehydratedState = dehydrate(queryClient);

    return (
        <ReactQueryHydrate state={dehydratedState}>
            <BlogListWithPagination />
        </ReactQueryHydrate>
    );
};
export default HydratedPosts;
