import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BE_BASE_URL;
const apiVersion = process.env.NEXT_PUBLIC_API_VERSION;

export async function fetchGeminiResponse(input, chats) {

  const { data } = await axios.post(`${baseUrl}/${apiVersion}/response`, {
    prompt: input,
    history: chats,
  });

  return data.response;
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
