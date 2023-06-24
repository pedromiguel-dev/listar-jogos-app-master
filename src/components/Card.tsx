import { game } from "../App";
import windows_logo from "../assets/microsoft-windows-22-logo-svgrepo-com.svg";

type CardProps = {
    games: game[] | null;
    filteredGames: game[] | null;
  };
  
export default function Card({ games, filteredGames }: CardProps) {
    const formatDate = (string: string) => {
      const date = new Date(string);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();
  
      return `${day}/${month}/${year}`;
    };

    if (filteredGames !== null) {
        return (
          <>
            {filteredGames.map((game) => (
              <li
                key={game.id}
                className=" hover:scale-95 md:hover:scale-105 transition-all duration-300"
              >
                <div className="flex flex-col bg-white shadow-md rounded-lg p-4 w-full h-full max">
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    loading="lazy"
                    className="object-cover object-center rounded-md mb-4 aspect-video"
                  />
                  <div
                    className="
                    flex flex-col align-center mb-3
                    w-full h-full 
                  "
                  >
                    <h2 className="text-2xl font-black text-gray-900">
                      {game.title}
                    </h2>
                    <p className="text ">
                      {game.short_description} Released on{" "}
                      {formatDate(game.release_date)}.
                    </p>
                  </div>
                  <p className="font-light uppercase text-sm px-1">{game.genre}</p>
                  <div className="flex flex-row justify-between pb-3 pt-0 px-1">
                    <p className="font-bold from-neutral-800 text-base">
                      By {game.publisher}
                    </p>
                    {game.platform === "PC (Windows)" ? (
                      <img
                        src={windows_logo}
                        alt="windows logo"
                        className="inline-block w-6 h-6"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                  <a
                    href={game.freetogame_profile_url}
                    className="
                      bg-blue-500 px-6 py-3 rounded-lg text-center text-white font-bold
                      shadow-md
                      hover:bg-blue-600
                      hover:border-blue-600
                      transition-colors duration-300
                    "
                  >
                    More info
                  </a>
                </div>
              </li>
            ))}
          </>
        );
    }

    return (
        <>
          {games === null ? (
          <></>
          ) : (
          games.map((game) => (
            <li
              key={game.id}
              className=" hover:scale-95 md:hover:scale-105 transition-all duration-300"
            >
              <div className="flex flex-col bg-white shadow-md rounded-lg p-4 w-full h-full max">
                <img
                  src={game.thumbnail}
                  alt={game.title}
                  loading="lazy"
                  className="object-cover object-center rounded-md mb-4 aspect-video"
                />
                <div
                  className="
                    flex flex-col align-center mb-3
                    w-full h-full 
                  "
                >
                  <h2 className="text-2xl font-black text-gray-900">
                    {game.title}
                  </h2>
                  <p className="text ">
                    {game.short_description} Released on{" "}
                    {formatDate(game.release_date)}.
                  </p>
                </div>
                <p className="font-light uppercase text-sm px-1">{game.genre}</p>
                <div className="flex flex-row justify-between pb-3 pt-0 px-1">
                  <p className="font-bold from-neutral-800 text-base">
                    By {game.publisher}
                  </p>
                  {game.platform === "PC (Windows)" ? (
                    <img
                      src={windows_logo}
                      alt="windows logo"
                      className="inline-block w-6 h-6"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <a
                  href={game.freetogame_profile_url}
                  className="
                      bg-blue-500 px-6 py-3 rounded-lg text-center text-white font-bold
                      shadow-md
                      hover:bg-blue-600
                      hover:border-blue-600
                      transition-colors duration-300
                    "
                >
                  More info
                </a>
              </div>
            </li>
          ))
        )}
        </>
    );
  }
  