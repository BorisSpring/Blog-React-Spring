import React from 'react';
import { useQueryClient } from '@tanstack/react-query';

//components

//custom hooks and api action
import { useGetParams } from '../../hooks/useGetParams';
import { findBlogsForPage } from '../../api/actions';
import { useParams } from 'react-router';
import LoadingSpinner from '../LoadingSpinner';
import BlogArticle from '../BlogArticle';
import Pagination from '../Pagination';
import SearchBlog from '../SearchBlog';
import LatestBlogs from '../ContactPage/LatestBlogs';
import Categories from '../Categories';
import Tags from '../Tags';
import { useFindBlogsForPage } from './useFindBlogsForPage';

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
        <div className='flex flex-col  lg:grid lg:grid-cols-2 lg:gap-y-0 lg:gap-x-10  w-full '>
          {pageBlogs?.content?.map((blog, index) => (
            <BlogArticle
              key={index}
              {...blog}
              styles={` ${index % 2 === 0 ? 'xl:ml-0' : 'xl:mr-0 '}`}
              isSwiper={true}
              imageStyles='lg:max-h-[240px]  w-full aspect-video object-top '
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
