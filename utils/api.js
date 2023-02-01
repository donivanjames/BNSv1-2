//import fetch from "node-fetch";
//const API_BASE_URL = "http://localhost:8080";



/*
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

const sessionData = {
    name: "Latoya",
    score: 1000,
  };
  
  addScore(sessionData);
  
  export async function addScore(sessionData) {
  
    const url = new URL(`${API_BASE_URL}`);
    const options = {
      method: "POST",
      //headers,
      body: JSON.stringify({ data: sessionData })
      //signal,
    };
  
    console.log("Score added");
    return await fetchJson(url, options); //, reservation)
  }
  */