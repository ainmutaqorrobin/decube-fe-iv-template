import { create } from "zustand";
import { MovieDetail } from "../type";
import { getMovieDetail } from "@/lib/fetch";
import { AxiosError } from "axios";

interface useMovieDetailHooks {
  loading: boolean;
  error: string | null;
  movie: MovieDetail | null;
  onGetMovie: (id: string) => void;
}

const useMovieDetail = create<useMovieDetailHooks>((set) => ({
  error: "",
  loading: false,
  movie: null,
  async onGetMovie(id) {
    set({ loading: true, movie: null });
    try {
      const response = await getMovieDetail(id);
      set({ movie: response });
    } catch (error) {
      let errorMessage = "Unknown error";
      if (error instanceof AxiosError) {
        errorMessage = error.message;
      }
      set({ error: errorMessage });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useMovieDetail;
