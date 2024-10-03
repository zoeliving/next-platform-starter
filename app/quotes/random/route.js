// Static rendering for /quotes/random route

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/quotes/random');
  const quote = await res.json();

  return {
    props: {
      quote,
    },
  };
}

const RandomQuotePage = ({ quote }) => {
  return (
    <div>
      <h1>Random Quote</h1>
      <blockquote>
        <p>{quote.text}</p>
        <footer>- {quote.author}</footer>
      </blockquote>
    </div>
  );
};

export default RandomQuotePage;
