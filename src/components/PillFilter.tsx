import { game } from "../App";
import { SkeletonPills } from "./SkeletonCards";

type PillFilterProps = {
    loading: boolean;
    genres: Set<string>;
    filteredGames: game[] | null;
    setGenre: (genre: string | null) => void;
    filteredGenre: string;
  };
  
  export default function PillFilter(props: PillFilterProps) {
    const { loading, genres, filteredGames, filteredGenre, setGenre } = props;
  
    if (loading) {
      return <SkeletonPills />;
    }
  
    console.log({genres});
    
  
    return (
      <div
        className="flex flex-wrap gap-4 mb-5 p-1
            scrollbar-hide justify-center md:justify-start
            h-52 md:h-auto overflow-y-auto
            "
      >
        
        {Array.from(genres).map((genre, index) => (
          <button
            key={genre}
            onClick={() => {
              if (filteredGenre === genre) {
                setGenre(null);
                return;
              }
              setGenre(genre);
            }}
            className={
            filteredGenre === genre
                ? "flex flex-row items-center justify-between bg-blue-500 text-white rounded-full min-w-max p-3 hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-sm h-min"
                : "flex flex-row items-center justify-between bg-white rounded-full min-w-18 p-3 hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm h-min"
            }
          >
            {genre}
            {filteredGenre === genre ? (
              <span className=" ml-2 text-white font-bold h-full">
                <svg
                  className="fill-current text-red-500 text-bold"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 16 16"
                  width="24px"
                >
                  <path
                    className="
                      stroke-black
                      strike-opacity-100
                      "
                    d="m 3.980469 4 h 1 h 0.03125 c 0.253906 0.011719 0.511719 0.128906 0.6875 0.3125 l 2.28125 2.28125 l 2.3125 -2.28125 c 0.265625 -0.230469 0.445312 -0.304688 0.6875 -0.3125 h 1 v 1 c 0 0.285156 -0.035157 0.550781 -0.25 0.75 l -2.28125 2.28125 l 2.25 2.25 c 0.1875 0.1875 0.28125 0.453125 0.28125 0.71875 v 1 h -1 c -0.265625 0 -0.53125 -0.09375 -0.71875 -0.28125 l -2.28125 -2.28125 l -2.28125 2.28125 c -0.1875 0.1875 -0.453125 0.28125 -0.71875 0.28125 h -1 v -1 c 0 -0.265625 0.09375 -0.53125 0.28125 -0.71875 l 2.28125 -2.25 l -2.28125 -2.28125 c -0.210938 -0.195312 -0.304688 -0.46875 -0.28125 -0.75 z m 0 0"
                  />
                </svg>
              </span>
            ) : (
              <></>
            )}
          </button>
        ))}
      </div>
    );
  }
  