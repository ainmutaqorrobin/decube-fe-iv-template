import axios, { AxiosError } from "axios";

const token = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`;
export const getAllMovies = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/popular`,
      { headers: { Authorization: token } }
    );

    if (response.status === 200) {
      return response.data.results;
    }
  } catch (error) {
    const err = error instanceof AxiosError;
    return err;
  }
};

export const getMovieDetail = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/3/movie/${id}`,
      { headers: { Authorization: token } }
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    const err = error instanceof AxiosError;
    return err;
  }
};
