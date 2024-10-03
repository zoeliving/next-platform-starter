import React from 'react';

export async function getStaticPaths() {
  // Fetch all slugs (URIs) of pages from WordPress via GraphQL
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetAllPages {
          pages {
            edges {
              node {
                slug
              }
            }
          }
        }
      `,
    }),
  });

  const json = await res.json();

  const paths = json?.data?.pages?.edges.map((page) => ({
    params: { slug: page.node.slug },
  })) || [];

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  // Fetch the page content based on the slug
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetPage($id: ID!) {
          page(id: $id, idType: URI) {
            title
            content
          }
        }
      `,
      variables: {
        id: params.slug,
      },
    }),
  });

  const json = await res.json();

  if (!json?.data?.page) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      page: json.data.page,
    },
  };
}

const Page = ({ page }) => {
  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default Page;
