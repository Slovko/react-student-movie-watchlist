import MovieCard from './MovieCard.jsx'
import { Clapperboard } from 'lucide-react'

export default function MovieList({ movies, onToggle }) {
  if (!movies.length) return <div className="empty-state"><Clapperboard size={22} /><p>Список поки порожній. Додайте перший фільм!</p></div>
  return <div className="movie-list">{movies.map(movie => <MovieCard key={movie.id} {...movie} onToggle={() => onToggle(movie.id)} />)}</div>
}
