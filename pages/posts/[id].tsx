import { GetStaticProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import Date from '../../components/date';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData, Post } from '../../lib/posts';

type Props = {
  post: Post;
};

export default function PostDetails({ post }: Props) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <Date date={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params && typeof params.id === 'string') {
    const postData = await getPostData(params.id);
    return {
      props: {
        post: postData,
      },
    };
  }
  return {
    props: {
      post: null,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
