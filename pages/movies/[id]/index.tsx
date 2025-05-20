import useMovieDetail from "@/src/hooks/useMovieDetail";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const router = useRouter();
  const { id } = router.query;
  const { error, loading, movie, onGetMovie } = useMovieDetail();
  useEffect(() => {
    if (id && typeof id === "string") onGetMovie(id);
  }, [id]);

  if (!movie) return <p>There is no movie list</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something error going on</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Title & Tagline */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">{movie.title}</h1>
        <p className="text-xl text-gray-500 italic">{movie.tagline}</p>
      </div>

      {/* Poster & Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${movie.backdrop_path}`}
          width={300}
          height={200}
          alt={movie.title}
          className="rounded-lg shadow-md w-full md:w-60 h-auto object-cover"
        />

        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">Release Date:</span>{" "}
            {dayjs(movie.release_date).format("DD/MM/YYYY")}
          </p>
          <p>
            <span className="font-semibold">Rating:</span> {movie.vote_average}{" "}
            / 10 ({movie.vote_count} votes)
          </p>
        </div>
      </div>

      {/* Overview */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-1">Overview</h4>
        <p className="text-gray-700">{movie.overview}</p>
      </div>

      {/* Genres */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-1">Genres</h4>
        <ul className="flex flex-wrap gap-2">
          {movie.genres.map((genre: any) => (
            <li
              key={genre.id}
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {genre.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Production Companies */}
      <div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">
          Production Companies
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {movie.production_companies.map((company: any) => (
            <li key={company.id} className="flex items-center gap-2">
              {company.logo_path && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}/${company.logo_path}`}
                  width={60}
                  height={40}
                  alt={company.name}
                  className="h-10 object-contain"
                />
              )}
              <span className="text-sm text-gray-800">
                {company.name} ({company.origin_country})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Homepage */}
      <div>
        <Link
          href={"/movies"}
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default Index;
