import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Date from '../components/date';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData, Posts } from '../lib/posts';

type Props = {
  posts: Posts,
}

export default function Home({ posts }: Props) {
  return (
    <Layout home>
      <Head>
        <title>Next.js Sample Website</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Frontend Engineer, React, FP, Design System, TS/JS</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date date={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postsData = getSortedPostsData();
  return {
    props: {
      posts: postsData,
    },
  };
}
