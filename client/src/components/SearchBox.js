import React from "react";
import { MdSearch } from "react-icons/md";


const SearchBox = (props) => {

    const {handleSearchNote} = props

    return(

        <div className="search-box">
            <MdSearch className="search-icons" size="1.3em" />
            <input className="search-input" type="text" placeholder="type to search notes..." onChange={(e) => handleSearchNote(e.target.value) } />
        </div>
    )
}

export default SearchBox;