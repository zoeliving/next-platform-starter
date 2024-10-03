// Inside page.jsx or any component where you are fetching data
import { useEffect, useState } from 'react';

export default function Page() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
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

      const json = await res.json();
      setData(json.data.posts.edges);
    };

    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {data.map(({ node }) => (
          <li key={node.slug}>{node.title}</li>
        ))}
      </ul>
    </div>
  );
}
