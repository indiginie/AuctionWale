import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";


function Filter(){
    const [searchParams, setSearchParams] = useSearchParams();

    
    const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city")|| "",
    bank: searchParams.get("bank") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    possession: searchParams.get("possession") || "",
     });
     
     

    const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
     };

    const handleFilter = () => {
    setSearchParams(query);
     };

   

    return (
        
        <div className='filter'>
            <h1>Search Results for <b>{searchParams.get("city")}</b></h1>
                <div className="top">
                    <div className="item">
                        <label htmlFor="city">District</label>
                         <input
                         type="text"
                         id="city"
                         name="city"
                         placeholder="City Location"
                         onChange={handleChange}
                        defaultValue={query.city}
                         />
                    </div>
                </div>
            <div className="bottom">
                <div className="item">
                    <label htmlFor='type'>Type</label>
                    <select name='type' id='type'
                    onChange={handleChange}
                    defaultValue={query.type}
                    
                    >
                        <option value="">All</option>
                        <option value="FF">Flat & Floor</option>
                        <option value="IH">Independent House</option>
                        <option value="IP">Industrial Property</option>
                        <option value="AP">Agricultural Property</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor='bank'>Bank</label>
                    <select
                     name='bank' id='bank'
                     onChange={handleChange}
                     defaultValue={query.bank}
                     >
                        <option value="">All</option>
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC</option>
                        <option value="PNB">PNB</option>
                        <option value="ICICI">ICICI</option>
                    </select>
                </div>
                <div className="item">
                    <label htmlFor='minPrice'>Min Price</label>
                    <input type='number' id='minPrice' name='minPrice' placeholder='From' onChange={handleChange}
                    defaultValue={query.minPrice}/>
                </div>
                <div className="item">
                    <label htmlFor='maxPrice'>Max Price</label>
                    <input type='number' id='maxPrice' name='maxPrice' placeholder='To' 
                    onChange={handleChange}
                    defaultValue={query.maxPrice}/>
                </div>
                <div className="item">
                    <label htmlFor='possession'>Type of Possession</label>
                     <select name='possession' id='possession'
                     onChange={handleChange}
                     defaultValue={query.possession}>
                        <option value="">All</option>
                        <option value="physical">Physical</option>
                        <option value="symbolic">Symbolic</option>
                     </select>
                </div>
                <button onClick={handleFilter}>
                    <img src='/search.png' alt=''/>
                </button>
            </div>
        </div>
    )
}

export default Filter