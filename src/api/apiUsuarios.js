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
        });

        if (response.status == 404) {
            throw new Error(`Error en la solicitud: ${response.status} no ha sido posible conectarse al servidor`)
        }
        if (!response.ok) {
            const errorData = await response.json();
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
        console.error("Error al realizar el POST:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
};
const tokenUsuario = async (token) => {
    try {
        const response = await fetch(ENDPOINTS.tokenUsuario, {

            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`, // Incluye el token en el header
            }
        })

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData?.message || `Error en la solicitud: ${errorData.error}`);
        }
        const data = await response.json()
        console.log(data)
        return data; // Si la respuesta es exitosa, devolver los datos
    } catch (error) {
        console.error(error.message);

        throw error; // Lanzar el error para manejarlo en el lugar donde se llama la función
    }
};

const updateUsuario = async (usuario) => {
    try {
        const response = await fetch(ENDPOINTS.updateUsuario, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },
            body: JSON.stringify(usuario),
        }); console.log(response)

        if (response.status == 404) {
            throw new Error(`Error en la solicitud: ${response.status} no ha sido posible conectarse al servidor`)
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            console.log(errorData.error)
            throw new Error(
                `Error en la solicitud: ${response.status}, telefono ya existe`
            );
        }
        // Procesar la respuesta si fue exitosa
        const data = await response.json();
        console.log("Solicitud exitosa:", data);
        return data;
    } catch (error) {
        // Manejar errores de red u otros
        console.log(error)
        console.error("Error al realizar la actualizacion:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
};

const borrarUsuario = async (id) => {
    try {
        const response = await fetch(ENDPOINTS.borrarUsuario(id), {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${localStorage.getItem('token')}`, // Incluye el token en el header
            },

        }); console.log(response)

        if (response.status == 404) {
            throw new Error(`Error en la solicitud: ${response.status} no ha sido posible conectarse al servidor`)
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            console.log(errorData.error)
            throw new Error(
                `Error en la solicitud: ${response.status}, no tiene permiso para realizar esta accion`
            );
        }
        // Procesar la respuesta si fue exitosa
        const data = await response.json();
        console.log("Solicitud exitosa:", data);
        return data;
    } catch (error) {
        // Manejar errores de red u otros
        console.log(error)
        console.error("Error al realizar la actualizacion:", error.message);
        // Lanzar el error para manejarlo desde el front
        throw error;
    }
};
export const apiUsuarios = { crearUsuario, loginUsuario, tokenUsuario, updateUsuario, borrarUsuario }