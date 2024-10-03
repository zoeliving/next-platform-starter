import React, { useEffect } from 'react';

export async function getStaticProps() {
  // Fetch the page data and Elementor CSS from WordPress via GraphQL
  const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query GetAgeReversingPage {
          page(id: "agereversing", idType: URI) {
            title
            content
            elementorCss: pageMeta(key: "_elementor_css")
          }
        }
      `,
    }),
  });

  const json = await res.json();

  // Check if the data is valid
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

const AgeReversingPage = ({ page }) => {
  useEffect(() => {
    // Dynamically add Elementor's CSS for the page
    if (page.elementorCss) {
      const style = document.createElement('style');
      style.innerHTML = page.elementorCss;
      document.head.appendChild(style);
    }
  }, [page]);

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default AgeReversingPage;
