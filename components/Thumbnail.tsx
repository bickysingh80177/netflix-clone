import { Movie } from '../typings'
import Image from 'next/image'

interface Props {
  movie: Movie
  // when using Firebase
  // movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  return (
    <div className="md: relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out hover:scale-105 md:h-36 md:min-w-[260px]">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail
