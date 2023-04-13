import Link from "next/link";
import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Link href="/">
          <a className={styles.logo}><img src="https://sync.audi0file.com/?r=/download&path=L0F1ZGkwRklMRS9FQzIwMEZDOS0zMEI4LTQ1QTEtODkwOS1EMzY5NUNENzFGMjMuUE5H" alt="logo" />
</a>
        </Link>
        <div className={styles.nav}>
          <Link href="/">
            <a className={styles.navItem}>Home</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>Products</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>Pricing</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>About</a>
          </Link>
          <Link href="/">
            <a className={styles.navItem}>Contact</a>
          </Link>
          <button className={styles.button}>Buy Now!</button>
        </div>
      </div>
    </header>
  );
};
export default Header;
