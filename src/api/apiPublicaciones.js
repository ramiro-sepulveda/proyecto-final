import ENDPOINTS from "./endpoints";


const getProductos = async () => {

    try {

        const response = await fetch(ENDPOINTS.readGaleria);
        const data = await response.json();
        console.log(data.results)
        return data
    } catch (error) {
        console.log("error fetch JSON");

    };
}

export const apiPublicaciones = { getProductos }
