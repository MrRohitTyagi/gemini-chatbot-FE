import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BE_BASE_URL;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export async function fetchGeminiResponse(input, chats) {
  try {
    const { data } = await axios.post(`${baseUrl}/${apiVersion}/response`, {
      prompt: input,
      history: chats,
    });

    return data.response;
  } catch (error) {
    console.log("error", error);
    return (
      error?.response?.data || "Error! Something went wrong please try again"
    );
  }
}

export async function checkAvailability() {
  try {
    const { data } = await axios.get(`${baseUrl}/${apiVersion}/online`);
    return data.response;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}
