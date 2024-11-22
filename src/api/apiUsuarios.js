import ENDPOINTS from "./endpoints";

const crearUsuario = async (usuario) => {
    try {
        const response = await fetch(ENDPOINTS.crearUsuario, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(usuario),
        }); console.log(response)

        if (response.status == 404) {
            throw new Error(`Error en la solicitud: ${response.status} no ha sido posible conectarse al servidor`)
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.error)
            throw new Error(
                errorData?.error || `Error en la solicitud: ${response.status}`
            );
        }
        // Procesar la respuesta si fue exitosa
        const data = await response.json();
        console.log("Solicitud exitosa:", data);
        return data;
    } catch (error) {
        // Manejar errores de red u otros
        console.log(error)
        console.error("Error al realizar el POST:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
};

const loginUsuario = async (login) => {
    try {
        const response = await fetch(ENDPOINTS.loginUsuario, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(login),
        }); console.log(response)

        if (response.status == 404) {
            throw new Error(`Error en la solicitud: ${response.status} no ha sido posible conectarse al servidor`)
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.error)
            throw new Error(
                errorData?.error || `Error en la solicitud: ${response.status}`
            );
        }
        // Procesar la respuesta si fue exitosa
        const data = await response.json();
        console.log("Solicitud exitosa:", data);
        return data;
    } catch (error) {
        // Manejar errores de red u otros
        console.log(error)
        console.error("Error al realizar el POST:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
};

const updateUsuario = async (token) => {
    try {
        const response = await fetch(ENDPOINTS.tokenUsuario, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`, // Incluye el token en el header
            },
            body: JSON.stringify(),
        }); console.log(response)

        if (response.status == 404) {
            throw new Error(`Error en la solicitud: ${response.status} no ha sido posible conectarse al servidor`)
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData.error)
            throw new Error(
                errorData?.error || `Error en la solicitud: ${response.status}`
            );
        }
        // Procesar la respuesta si fue exitosa
        const data = await response.json();
        console.log("Solicitud exitosa:", data);
        return data;
    } catch (error) {
        // Manejar errores de red u otros
        console.log(error)
        console.error("Error al realizar el POST:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
};
export const apiUsuarios = { crearUsuario, loginUsuario, updateUsuario }