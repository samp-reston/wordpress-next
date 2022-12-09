import fetcher from "../../lib/fetcher";
import { useRouter } from "next/router";
import { GET_ALL_POSTS_WITH_SLUG, POST_BY_SLUG } from "../../lib/wordpress/api";

type Post = {
  title: string
  slug: string
  content: string
  date: string
  featuredImage: {
    node: {
      sourceUrl: string
    }
  }
}

const post = ({ postData }: any) => {
  const blogPost: Post = postData?.data?.post;
  const router = useRouter();

  if (!router.isFallback && !blogPost?.slug) {
    return <div>Failed...</div>;
  }

  return (
    <div>
      {router.isFallback ? (
        <div>Loading...</div>
      ) : (
        <div dangerouslySetInnerHTML={{__html: blogPost.content}} />
      )}
    </div>
  )
}

export default post

export const getStaticPaths = async () => {
  const posts = await fetcher(GET_ALL_POSTS_WITH_SLUG);
  const allPosts: Post[] = await posts?.data?.posts?.nodes;

  return {
    paths: allPosts.map((post) => `/post/${post.slug}`) || [],
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: any) => {
  const variables = {
    id: params.slug,
    idType: "SLUG",
  }

  const data = await fetcher(POST_BY_SLUG, {variables});

  return {
    props: {
      postData: data,
    },
  };
}
