import { useEffect, useContext } from "react";
import { MarketContext } from "../context/ContextMarket";

const VerificadorToken = () => {

    const { logout } = useContext(MarketContext)
    useEffect(() => {
        const checkTokenExp = () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const payload = JSON.parse(atob(token.split(".")[1])); // Decodifica el payload del token
                const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

                if (payload.exp && payload.exp < currentTime) {
                    // El token ha caducado
                    console.log("Token ha expirado, limpiando localStorage...");
                    logout()
                }
            } catch (error) {
                console.error("Error al procesar el token:", error);
                logout();
            }
        };

        // Ejecutar la verificación periódicamente (cada minuto)
        const interval = setInterval(checkTokenExp, 15 * 1000);

        // Limpia el intervalo al desmontar el componente
        return () => clearInterval(interval);
    }, []);
};

export default VerificadorToken;