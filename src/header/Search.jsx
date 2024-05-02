import { useContext, useState, useCallback } from "react";
import styles from "./Search.module.css";

import { MapContext, HotelContext } from "../context";
import Icon from "../components/ui/Icon";
import SearchIcon from "../../assets/search.svg";

import findProperty from "../utils/search/find-property";

function Search() {
    const { dispatch } = useContext(MapContext);
    const { hotels } = useContext(HotelContext);
    const [value, setValue] = useState("");

    const onSearchCallback = useCallback(
        (event) => {
            event.preventDefault();
            dispatch({ type: "TogglePopup", showPopup: false });

            const results = hotels.filter((hotel) => findProperty(hotel.properties, value.toLowerCase()));
            dispatch({ type: "SetList", list: results });
            dispatch({ type: "ToggleList", showList: true });
        },
        [dispatch, hotels, value]
    );

    const onKeyUpCallback = useCallback(
        (event) => {
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
            <form onSubmit={onSearchCallback}>
                <input onKeyUp={onKeyUpCallback} className={styles.input} placeholder="keresés" type="search" />
                <button type="submit" className={[styles.searchButton, "resetButton"].join(" ")}>
                    <SearchIcon />
                </button>
            </form>
        </div>
    );
}

export default Search;
