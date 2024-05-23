import { useContext, useState, useCallback } from "react";
import styles from "./Search.module.css";

import { MapContext, HotelContext } from "../context";
import Icon from "../components/ui/Icon";
import SearchIcon from "../../assets/search.svg";

import findProperty from "../utils/search/find-property";
import { Source_Code_Pro, Montserrat } from 'next/font/google'
const scp = Source_Code_Pro({ subsets: ['latin'] })

function Search() {
    const { dispatch } = useContext(MapContext);
    const { hotels } = useContext(HotelContext);
    const [value, setValue] = useState("");

    const onSearchCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: "TogglePopup", showPopup: false });

            const results = hotels.filter((hotel) => hotel.name.toLowerCase().includes(value.toLowerCase()) || hotel.district.toLowerCase().includes(value.toLowerCase()));
            dispatch({ type: "SetList", list: results });
            dispatch({ type: "ToggleList", showList: true });
        },
        [dispatch, hotels, value]
    );

    const onKeyUpCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: "TogglePopup", showPopup: false });

            const results = hotels.filter((hotel) => hotel.name.toLowerCase().includes(value.toLowerCase()) || hotel.district.toLowerCase().includes(value.toLowerCase()));
            dispatch({ type: "SetList", list: results });
            dispatch({ type: "ToggleList", showList: true });

            setValue(event.target.value);
            if (event.key === "Escape" || value === "") {
                dispatch({ type: "SetList", list: [] });
                dispatch({ type: "ToggleList", showList: false });
            }
        },
        [value, dispatch]
    );

    return (
        <div className={styles.form}>
            <form onSubmit={onSearchCallback} className={scp.className}>
                <input onKeyUp={onKeyUpCallback} className="search" style={{padding: "10px", width: "100%", border: "2px solid #111"}} placeholder="keresés" type="search" />
                <style jsx>{`
                    input:focus {
                        border: 2px solid var(--dark-blue);
                        border-radius: 1px;
                        width: 100px;
                    }
                    .search {
                        font-family: ${scp.style.fontFamily};
                    }
                    `}</style>

                <button type="submit" className={[styles.searchButton, "resetButton"].join(" ")}>
                    <SearchIcon />
                </button>
            </form>
        </div>
    );
}

export default Search;
