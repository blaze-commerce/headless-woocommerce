import Blog, { getBlogStaticProps } from '@src/pages/[country]/blog/blog-page';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};
export const getStaticProps = getBlogStaticProps;
export default Blog;
