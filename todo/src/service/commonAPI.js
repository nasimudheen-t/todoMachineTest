import axios from "axios";
import BASE_URL from "./baseUrl";

const commonAPI = async (method, url, body = null) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data: body,
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default commonAPI;