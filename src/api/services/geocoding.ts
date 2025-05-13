// filepath: /Users/brandonmacal/Documents/Escuela/2025-2/Ingenieria de software/Proyecto/city-lens-front-end/src/api/services/geocoding.ts

/**
 * Realiza una geocodificación inversa para obtener la ciudad y la colonia a partir de latitud y longitud.
 * @param lat Latitud de la ubicación.
 * @param lon Longitud de la ubicación.
 * @returns Un objeto con la ciudad y la colonia.
 */
export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "city-lens-app", // Importante para evitar bloqueos
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la ubicación");
    }
    const data = await response.json();
    return {
      city: data.address.city || data.address.town || data.address.village || "",
      suburb: data.address.suburb || data.address.neighbourhood || "",
      postalCode: data.address.postcode || "", // Agrega el código postal
    };
  } catch (error) {
    console.error("Error en la geocodificación inversa:", error);
    throw error;
  }
};