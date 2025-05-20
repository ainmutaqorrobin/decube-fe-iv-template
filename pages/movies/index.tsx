import useAllMovies from "@/src/hooks/useAllMovies";
import Link from "next/link";
import React, { useEffect } from "react";
function Index() {
  const { error, getMoviesList, loading, movies } = useAllMovies();

  useEffect(() => {
    getMoviesList();
  }, []);

  if (!movies) return <p>There is no movie list</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something error going on</p>;

  return (
    <div>
      {movies.map((movie) => (
        <>
          <p key={movie.id}>{movie.title}</p>
          <Link href={`/movies/${movie.id}`}>Click here for detail</Link>
        </>
      ))}
    </div>
  );
}

export default Index;
