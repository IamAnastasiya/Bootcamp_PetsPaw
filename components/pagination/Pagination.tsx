import styles from './Pagination.module.scss';


const Pagination:React.FC<{count: number, active: number, setPagination: (index: number) => void}> = (props) => {
    const paginationDots = [];

    for (let i = 1; i <= props.count; i++) {
      paginationDots.push(i);
    }

    return <ul className={styles.pagination}>
         {paginationDots.map((dot, index) => (
            <span 
                key={dot} 
                className={`${styles['pagination-dot']} ${index === props.active ? styles['active'] : ''}`} 
                onClick={() => props.setPagination(index)}>
            </span>
        ))}
    </ul>
}

export default Pagination;