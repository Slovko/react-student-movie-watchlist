import { Check, CircleCheck, Film } from 'lucide-react'

export default function MovieCard({ title, genre, watched, onToggle }) {
  return <article className="movie-row"><div className="movie-icon"><Film size={19} /></div><div className="movie-info"><h3>{title}</h3><span>{genre}</span></div><button className={`watched-button ${watched ? 'is-watched' : ''}`} onClick={onToggle}>{watched ? <><CircleCheck size={15} /> ÐŸÐµÑ€ÐµÐ³Ð»ÑÐ½ÑƒÑ‚Ð¾</> : <><Check size={15} /> ÐŸÐ¾Ð·Ð½Ð°Ñ‡Ð¸Ñ‚Ð¸</>}</button></article>
}

