import styles from './SearchBar.module.scss';

const SearchBar = () => {
    return <div className={styles['search-wrapper']}>
        <input className={styles['search-input']}
        type="text"
        placeholder="Search for breeds by name"/>
      <button className={styles['search-btn']}></button>
    </div>
}

export default SearchBar;