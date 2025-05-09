import styles from "./userRegistration.module.css";

export default function UserRegistration() {
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Create Account</h1>
			<form>
				<input type="text" className={styles.input} placeholder="Username" required />
				<input type="email" className={styles.input} placeholder="Email" required />
				<input type="password" className={styles.input} placeholder="Password" required />
				<input type="password" className={styles.input} placeholder="Confirm Password" required />
				<button type="submit" className={styles.button}>
					Register
				</button>
			</form>
		</div>
	);
}
