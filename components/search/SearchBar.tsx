import styles from './SearchBar.module.scss';
import { useState } from 'react';
import { useRouter} from 'next/router';

const SearchBar = () => {

  const router = useRouter();
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event: React.FormEvent) => {
      event.preventDefault();
      router.push(`/search?breed=${searchInput}`);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
  }


    return <form className={styles['search-wrapper']} onSubmit={handleSearchInput}>
          <input className={styles['search-input']}
          type="text"
          placeholder="Search for breeds by name"
          value={searchInput}
          onChange={handleChange}/>
      <button className={styles['search-btn']}></button>
    </form>
}

export default SearchBar;