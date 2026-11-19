import MovieCard from './MovieCard.jsx'
import { Clapperboard } from 'lucide-react'

export default function MovieList({ movies, onToggle }) {
  if (!movies.length) return <div className="empty-state"><Clapperboard size={22} /><p>Ð¡Ð¿Ð¸ÑÐ¾Ðº Ð¿Ð¾ÐºÐ¸ Ð¿Ð¾Ñ€Ð¾Ð¶Ð½Ñ–Ð¹. Ð”Ð¾Ð´Ð°Ð¹Ñ‚Ðµ Ð¿ÐµÑ€ÑˆÐ¸Ð¹ Ñ„Ñ–Ð»ÑŒÐ¼!</p></div>
  return <div className="movie-list">{movies.map(movie => <MovieCard key={movie.id} {...movie} onToggle={() => onToggle(movie.id)} />)}</div>
}

