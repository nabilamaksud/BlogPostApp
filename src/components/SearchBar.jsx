import { useState } from "react"
const SearchBar = () => {

    const [query, setQuery] = useState("")

    function search(e) {
        e.preventDefault()
        setQuery(e.target.value)

    }

    return (
        <div>
            <input
                type="text"
                className="searchBar"
                placeholder="Search"
                onChange={search}
                value={query}
            />
            <button className="searchButton">🔍</button>
        </div>
    );
};

export default SearchBar;