import { Link } from "react-router-dom";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  poster_path,
  overview,
}) => {
  return (
    <div className="group relative rounded-lg overflow-hidden bg-gray-800 bg-opacity-70 hover:bg-opacity-80 shadow-xl transition duration-500 w-full lg:w-[90%] max-w-72 lg:max-w-xs mx-auto">
      {/* Plakat filmu */}
      <div className="relative w-full h-72">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="object-fill w-full h-full group-hover:scale-110 transition-all duration-300"
        />
      </div>

      {/* Tytuł */}
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold text-indigo-400 group-hover:text-white transition duration-200 line-clamp-1">
          {title}
        </h3>

        {/* Opis */}
        <p className="text-sm mt-2 text-gray-300 group-hover:text-gray-200 transition duration-200 line-clamp-3">
          {overview}
        </p>

        {/* Przekierowanie do szczegółów filmu po id */}
        <Link
          to={`/movie/${id}`}
          className="text-indigo-400 hover:text-indigo-300 mt-3 inline-block transition font-semibold"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
