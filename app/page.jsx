import { request, gql } from 'graphql-request';

export async function getStaticProps() {
  const endpoint = process.env.WP_GRAPHQL_API || 'https://patchingtohealth.com/graphql';

  // Define your GraphQL query to get posts from WordPress
  const query = gql`
    {
      posts {
        nodes {
          title
          content
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  // Fetch data from WordPress using graphql-request
  const data = await request(endpoint, query);

  return {
    props: {
      posts: data.posts.nodes,
    },
  };
}

export default function Page({ posts }) {
  return (
    <main className="flex flex-col gap-8 sm:gap-16">
      <section className="flex flex-col items-start gap-3 sm:gap-4">
        <h1 className="mb-0">Blog Posts</h1>
        <p className="text-lg">Fetched from WordPress using GraphQL</p>
      </section>
      
      <section className="flex flex-col gap-4">
        <ul>
          {posts.map((post, index) => (
            <li key={index}>
              <h2>{post.title}</h2>
              <img src={post.featuredImage?.node?.sourceUrl} alt={post.title} />
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
