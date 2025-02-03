import { getAllBaseContries } from '@src/lib/helpers/country';
import Blog, { getBlogStaticProps } from '@src/components/blog-page';

export const getStaticPaths = async () => {
  const countries = getAllBaseContries();
  const paths = countries.map((country) => ({
    params: {
      country,
    },
  }));

  return {
    paths,
    fallback: process.env.NODE_ENV === 'development',
  };
};

export const getStaticProps = getBlogStaticProps;
export default Blog;
