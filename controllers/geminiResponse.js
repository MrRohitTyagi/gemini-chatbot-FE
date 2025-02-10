import axios from "axios";

const baseurl = process.env.NEXT_PUBLIC_BE_BASE_URL;

export async function fetchGeminiResponse(input) {
  try {
    const { data } = await axios.post(`${baseurl}/api/v2/getresponse`, {
      prompt: input,
    });
    // let data = await mok(input);
    return data;
  } catch (error) {
    console.log("error", error);
    return (
      error?.response?.data || "Error! Something went wrong please try again"
    );
  }
}
