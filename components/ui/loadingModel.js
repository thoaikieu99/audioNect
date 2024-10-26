import styles from "./loading.module.scss";
const LoadingModel = () => {
  return (
    <div className={styles.backgt}>
      <div className="all">
        <span className={styles.loader}></span>
      </div>
    </div>
  );
};
export default LoadingModel;
