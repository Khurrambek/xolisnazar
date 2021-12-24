import React from 'react';
import './search-box.css'
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBox = () => {
    return (
        <form action="" className="section-search">
            <input type="text" className="form-control search-input" placeholder="Search Items Here" name="" id="" />
            <button type="submit" className=" btn search-input-icon"> <AiOutlineSearch /></button>
        </form>
    )
}

export default SearchBox
