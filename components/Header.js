
import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        Retell
      </div>
      <div className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <a 
              href="https://github.com/atapas/quotes"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}>
              GitHub
            </a>
          </li>
          <li className={styles.navItem}>
            <a 
              href="https://twitter.com/tapasadhikary"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.navLink}>
              Twitter
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#" className={styles.navLink}>
              Sign Out
            </a>
          </li>  
        </ul>
      </div>
    </div>
  );
};

export default Header;