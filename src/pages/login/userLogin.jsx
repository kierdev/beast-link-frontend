import styles from "./userLogin.module.css";

export default function UserLogin() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Beastlink University</h1>
			<h3 className={styles.heading}>Login</h3>
			<form>
				<input type="email" className={styles.input} placeholder="Email" required />
				<input type="password" className={styles.input} placeholder="Password" required />
				<input type="checkbox" className={styles.checkbox} />
				<label className={styles.label}>Remember Me</label>
				<button type="submit" className={styles.button}>
					Register
				</button>
			</form>
		</div>
	);
}
