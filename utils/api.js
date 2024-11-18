import {municipios} from '../assets/data/municipios'

export const getCityDescription = (cityName) => {
    if (!cityName) return
    const city = municipios.find(municipio => municipio.city.toLowerCase() === cityName.toLowerCase());
    if (city) {
      return city.description;
    } else {
      return `City ${cityName} not found.`;
    }
  };
  
  export const getCityLocation = (cityName) => {
    if (!cityName) return
    const city = municipios.find(municipio => municipio.city.toLowerCase() === cityName.toLowerCase());
    if (city) {
      return {
        lat: city.coordinates.latitude,
        long: city.coordinates.longitude
      };
    } else {
      return `City ${cityName} not found.`;
    }
  };

  export const getCityImage = (cityName) => {
    if (!cityName) return
    const city = municipios.find(municipio => municipio.city.toLowerCase() === cityName.toLowerCase());
    if (city) {
      return {
        image: city.image
      };
    } else {
      return `City ${cityName} not found.`;
    }
  };

  export const getCityData = (cityName) => {
    if (!cityName) return
    const city = municipios.find(municipio => municipio.city.toLowerCase() === cityName.toLowerCase());
    if (city) {
      return city
    } else {
      return `City ${cityName} not found.`;
    }
  };
  