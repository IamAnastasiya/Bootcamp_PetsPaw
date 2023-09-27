import styles from './Pagination.module.scss';


const Pagination:React.FC<{count: number}> = (props) => {

    const paginationDots = [];

    for (let i = 1; i <= props.count; i++) {
      paginationDots.push(i);
    }

    return <ul className={styles.pagination}>
         {paginationDots.map((dot) => (
            <span key={dot} className={styles["pagination-dot"]}></span>
        ))}
    </ul>
}

export default Pagination;