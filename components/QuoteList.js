
import { useEffect, useState } from 'react';
import QuoteCard from './QuoteCard';
import styles from './quotes.module.css';

const QuoteList = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/quotes')
      .then(res => res.json())
      .then(quotes => {
        setQuotes(quotes);
        console.log(quotes);
        setLoading(false);
      });
  }, []);


  return(
    <div>
      {
        loading ? 
        <p>Loading...</p> : 
        <ul className={styles.cardList}>
          {
            quotes.map(quote =>
              <QuoteCard key={quote.id} quote={quote.quote} author={quote.author} />
          )}
        </ul>
      }
    </div>
  );
};

export default QuoteList;