import { create } from "zustand";
import { Movie } from "../type";
import { AxiosError } from "axios";
import { getAllMovies } from "@/lib/fetch";

interface UseAllMovieHook {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  getMoviesList: () => void;
}

const useAllMovies = create<UseAllMovieHook>((set) => ({
  movies: [],
  error: null,
  loading: false,

  async getMoviesList() {
    set({ loading: true, error: null });

    try {
      const response = await getAllMovies();
      set({ movies: response });
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

export default useAllMovies;
