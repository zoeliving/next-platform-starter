import React from 'react';

export async function getStaticProps() {
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query {
          posts {
            edges {
              node {
                title
                slug
              }
            }
          }
        }
      `,
    }),
  });

  if (!res.ok) {
    console.error("Failed to fetch data from WordPress.");
    return {
      notFound: true,
    };
  }

  const json = await res.json();

  // Check if the response contains valid data
  if (!json.data || !json.data.posts) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: json.data.posts.edges,
    },
    revalidate: 60, // Rebuild the page at most once every 60 seconds (optional)
  };
}

const Page = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(({ node }) => (
          <li key={node.slug}>{node.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;

