import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

//components
import {
  BlogArticle,
  SearchBlog,
  LatestBlogs,
  Categories,
  LoadingSpinner,
  Tags,
  Pagination,
} from '../components';

//custom hooks and api action
import { useGetParams } from '../hooks/useGetParams';
import { useFindBlogsForPage } from '../hooks/useFindBlogsForPage';
import { findBlogsForPage } from '../api/actions';
import { useParams } from 'react-router';

const BlogPage = () => {
  const params = useGetParams();
  const { id } = useParams();
  id && params.set('userId', id);
  const { pageBlogs, isLoading } = useFindBlogsForPage();
  const queryClient = useQueryClient();

  const currentPage = Number(params.get('page'));

  if (currentPage < pageBlogs?.totalPages) {
    params.set('page', currentPage + 1);
    queryClient.prefetchQuery({
      queryFn: () => findBlogsForPage(params),
      queryKey: ['pageBlogs', params.toString()],
    });
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className='container mx-auto flex flex-col xl:flex-row gap-10'>
      <div className='w-full'>
        <div className='flex flex-col  lg:grid lg:grid-cols-2 lg:gap-y-10  w-full '>
          {pageBlogs?.content?.map((blog, index) => (
            <BlogArticle
              key={index}
              {...blog}
              styles={` ${index % 2 === 0 ? 'xl:ml-0' : 'xl:mr-0 '}`}
              isSwiper={true}
              imageStyles='max-h-[240px]  w-full aspect-video object-top '
            />
          ))}
        </div>
        <Pagination totalPages={pageBlogs?.totalPages} />
      </div>
      <div className='mx-auto w-full flex gap-5 flex-col mb-10 xl:max-w-[370px]'>
        <SearchBlog />
        <LatestBlogs />
        <Categories />
        <Tags />
      </div>
    </section>
  );
};

export default BlogPage;
