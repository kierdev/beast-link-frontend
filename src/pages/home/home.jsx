import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Home Page</h1>
      <p className={styles.description}>
        This is the main landing page of the application.
      </p>
    </div>
  );
}

