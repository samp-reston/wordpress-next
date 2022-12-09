import fetcher from '../lib/fetcher';
import { ALL_POSTS } from '../lib/wordpress/api'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  slug: string
  date: string
  excerpt: string
}

type BlogProps = {
  allPosts: Post[]
}

const blog = ({allPosts}: BlogProps) => {
  return (
    <div className="container">
      <main className="main">
        <div className="grid">
          {allPosts.map((post) => (
            <div className="card" key={post.slug}>
              <h3>{post.title}</h3>
              <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              <p>{post.date}</p>
              <Link legacyBehavior href={`/post/${post.slug}`}>
                <a>Read more</a>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default blog

export const getStaticProps = async () => {
  const response = await fetcher(ALL_POSTS);
  const allPosts = response?.data?.posts?.nodes;
  return {
    props: {
      allPosts,
    },
    revalidate: 1,
  };
}
