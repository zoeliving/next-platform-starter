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
        query GetFaqPage {
          page(id: "faq", idType: URI) {
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

const FaqPage = ({ page }) => {
  useEffect(() => {
    // Dynamically add Elementor's CSS for the page
    if (page.elementorCss) {
      const style =
