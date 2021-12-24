import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "f889a5cc82646de42a67b31bd4bc4283";

export const getwheatherData = async (cityname) => {
  try {
    const { data } = await axios.get(baseUrl + `q=${cityname}&appid=${apiKey}`);
    return data;
  } catch (error) {
    console.log(error);
  } 
};
