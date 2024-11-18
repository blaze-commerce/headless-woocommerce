import Blog, { getBlogStaticProps } from '@src/components/blog-page';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = getBlogStaticProps;
export default Blog;
