import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // we will use params to access the data passed to the dynamic route
  //   const { searchParams } = new URL(request.url);
  //   const id = searchParams.get("id");

  const apiKey = process.env.NEXT_PUBLIC_DEXTOOLS_API_KEY;

  try {
    const searchParams = request.nextUrl.searchParams;
    const chain = searchParams.get("chain");
    const contractAddress = searchParams.get("contractAddress");

    const reqQuote = await axios.get(
      `https://open-api.dextools.io/free/v2/token/${chain}/${contractAddress}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "X-BLOBR-KEY": apiKey,
        },
      }
    );

    const quote = reqQuote.data;
    return new Response(JSON.stringify(quote), {
      status: 200,
    });
  } catch (error: any) {
    // res.status().json({ error: 'An error occurred while processing your request.' });
    console.error(error);
    let errorMessage = "An error occurred while processing your request";
    let status = 500;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMessage = error.response.data.message || error.response.data;
      status = error.response.status;
    } else if (error.request) {
      // The request was made but no response was received
      errorMessage = "No response received";
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMessage = error.message;
    }
    return new Response(JSON.stringify(errorMessage), {
      status,
    });
  }
}
