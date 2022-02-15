
import styles from './footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      Made with ❤️ by <a
        href="https://tapasadhikary.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Tapas Adhikary
      </a>
      {' - '}<span>Powered by <a
        href="https://supertokens.com/"
        target="_blank"
        rel="noopener noreferrer"
      >SuperTokens</a> and <a
        href="https://nextjs.org/"
        target="_blank"
        rel="noopener noreferrer"
      >Next.js</a></span>
    </footer>
  );
};

export default Footer;
