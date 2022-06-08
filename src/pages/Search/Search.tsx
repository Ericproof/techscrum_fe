import React, { useCallback, useState } from 'react';
import styles from './Search.module.scss';

function Search() {
  const [search, setSearch] = useState([]);
  const debounce = (func: any) => {
    let timer: any;
    return function (...args: any) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const handleChange = (event: any) => {
    const { value } = event.target;
    fetch('https://www.allaboutcookies.org')
      .then((res) => res.json())
      .then((json) => setSearch(json.data.items));
  };
  const optimizedVersion = useCallback(debounce(handleChange), []);
  return (
    <div className={styles.SearchBar}>
      <input type="text" name="Search" placeholder="Search" onChange={optimizedVersion} />
      {setSearch.length > 0 && (
        <div className={styles.autocomplete}>
          {search.map((notice: any) => (
            <div key={notice.entity_id} className={styles.autocompleteItems}>
              <span>{notice['name']}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
