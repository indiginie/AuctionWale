import { useState } from "react"
import "./searchBar.scss"
import { Link } from "react-router-dom";

const types = ["FF","IH","IP" ,"AP"];

function SearchBar(){
    const [query, setQuery] = useState({
        type:"FF",
        city: "" ,
        minPrice: "",
        maxPrice: "",

    });

    const switchType = (val) => {
        setQuery((prev) => ({ ...prev, type: val }));
      };
      const handleChange = (e) => {
        setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
    return (
        <div className="searchBar">
            <div className="type">
            {/* {types.map((type) => (
                <button
                key={type}
                onClick={() => switchType(type)}
                className={query.type === type ? "active" : ""}
                    >
                {type}
          </button>
                ))} */}
                {types.forEach}
                <button key={"FF"} className={query.type === "FF" ? "active" : ""} onClick={() => switchType("FF")}>Flat or Floor</button>
                <button key={"IH"}  className={query.type === "IH" ? "active" : ""} onClick={() => switchType("IH")}>Independent House</button>
                <button key={"IP"} className={query.type === "IP" ? "active" : ""} onClick={() => switchType("IP")}>Industrial Property</button>
                <button  key={"AP"}className={query.type === "AP" ? "active" : ""} onClick={() => switchType("AP")}>Agricultural Property</button>
                
            </div>
            <form>
                <input type="text" name="city" 
                placeholder="City"
                onChange={handleChange}
                />
                <input type="number" name="minPrice" min={0} max={100000000} placeholder="Min Price" 
                onChange={handleChange} />
                <input type="number" name="maxPrice" min={0} max={100000000} placeholder="Max Price" 
                onChange={handleChange}/>
                <Link
                to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}
                >
                <button>
                    <img src="/search.png" alt=""></img>
                </button>
                </Link>
            </form>
        </div>
    )

}

export default SearchBar