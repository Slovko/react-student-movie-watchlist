import { Check, CircleCheck, Film } from 'lucide-react'

export default function MovieCard({ title, genre, watched, onToggle }) {
  return <article className="movie-row"><div className="movie-icon"><Film size={19} /></div><div className="movie-info"><h3>{title}</h3><span>{genre}</span></div><button className={`watched-button ${watched ? 'is-watched' : ''}`} onClick={onToggle}>{watched ? <><CircleCheck size={15} /> Переглянуто</> : <><Check size={15} /> Позначити</>}</button></article>
}
