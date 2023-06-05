
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/searchbar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const SearchBar = () => {

    const [searchItem, setSearchItem] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        navigate(`/books?search=${searchItem}`)

        setSearchItem('')

    }


    return (

        // <div className="search-container">
        //     <form onSubmit={handleSubmit}>
        //         <input
        //             type="text"
        //             placeholder="Search your books here..."
        //             value={searchItem}
        //             onChange={(e) => setSearchItem(e.target.value)}
        //         />
        //         <button type="submit">
        //             <div className="search-icon">
        //                 <FontAwesomeIcon icon={faMagnifyingGlass} />
        //             </div>
        //         </button>


        //     </form>


        // </div>
        <div className="search-container">
            <form onSubmit={handleSubmit}>
                <div className="search-icon fa-search">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <input
                    type="text"
                     placeholder="Search your books here..."
                     value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                />

            </form>
        </div>
    );
}

export default SearchBar;