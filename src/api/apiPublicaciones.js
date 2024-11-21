import ENDPOINTS from "./endpoints";
import { useContext } from "react";
import { MarketContext } from "../context/ContextMarket";

const getproductos = async () => {
    const { setProductos } = useContext(MarketContext);

    try {
        const response = await fetch(ENDPOINTS.readGaleria);
        const data = await response.json();
        setProductos(data.results);
        console.log(data.results)
    } catch (error) {
        console.log("error fetch JSON");

    };
}

export const apiPublicaciones = { getproductos }
