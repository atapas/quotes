

import styles from './quotes.module.css';

const QuoteCard = ({ quote, author, }) => {
  return (
    <li className={styles.card}>
      <div className={styles.quote}>
        <p>{quote}</p>
      </div>
      <div className={styles.author}>
        <p>{author}</p>
      </div>
    </li>
  );
};

export default QuoteCard;
