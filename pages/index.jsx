import React from 'react';

export async function getStaticProps() {
  // Fetch data from your WordPress GraphQL API
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetPages {
          pages {
            edges {
              node {
                title
                slug
                content
              }
            }
          }
        }
      `,
    }),
  });

  // Parse the JSON response
  const json = await res.json();

  // Check if the data is valid
  if (!json?.data?.pages?.edges) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pages: json.data.pages.edges,
    },
  };
}

const HomePage = ({ pages }) => {
  return (
    <div>
      <h1>Pages</h1>
      <ul>
        {pages.map(({ node }) => (
          <li key={node.slug}>
            <h2>{node.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: node.content }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
