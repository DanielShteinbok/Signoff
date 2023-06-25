import styles from "./Loading.module.css";

export default function Loading() {
    return (
        <div className={styles.lds_ellipsis}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}
