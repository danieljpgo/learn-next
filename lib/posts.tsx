import fs from 'fs';
import path from 'path';
import html from 'remark-html';
import remark from 'remark';
import matter from 'gray-matter';

export type Post = {
  id: string;
  title: string,
  date: string,
  contentHtml: string,
};

export type Posts = Omit<Post, 'contentHtml'>[];

const postsDirectory = path.join(process.cwd(), 'posts');

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.md$/, ''),
    },
  }));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);

  return {
    id,
    contentHtml: processedContent.toString(),
    ...matterResult.data,
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ id: a }, { id: b }) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });
}