import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Check, ChevronDown, Clapperboard, Clock3, Film, GraduationCap, Lightbulb, LoaderCircle, Plus, Sparkles, Users } from 'lucide-react'
import StudentCard from './components/StudentCard.jsx'
import Counter from './components/Counter.jsx'
import MovieList from './components/MovieList.jsx'
import { initialMovies, students } from './data.js'

const STORAGE_KEY = 'student-space-movies-v1'
const starterFact = 'Ð’Ð¾ÑÑŒÐ¼Ð¸Ð½Ñ–Ð³ Ð¼Ð°Ñ” Ñ‚Ñ€Ð¸ ÑÐµÑ€Ñ†Ñ, Ð° Ð¹Ð¾Ð³Ð¾ ÐºÑ€Ð¾Ð² Ð¼Ð°Ñ” Ð±Ð»Ð°ÐºÐ¸Ñ‚Ð½Ð¸Ð¹ ÐºÐ¾Ð»Ñ–Ñ€.'

function readMovies() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialMovies
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : initialMovies
  } catch { return initialMovies }
}

export default function App() {
  const [fact, setFact] = useState(starterFact)
  const [factLoading, setFactLoading] = useState(false)
  const [factError, setFactError] = useState('')
  const [course, setCourse] = useState('all')
  const [studentsVisible, setStudentsVisible] = useState(true)
  const [movies, setMovies] = useState(readMovies)
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [movieError, setMovieError] = useState('')

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(movies)) }, [movies])
  const filteredStudents = useMemo(() => course === 'all' ? students : students.filter(student => String(student.course) === course), [course])
  const watchedCount = movies.filter(movie => movie.watched).length

  async function getFact() {
    setFactLoading(true); setFactError('')
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
      if (!response.ok) throw new Error('Ð¡ÐµÑ€Ð²ÐµÑ€ Ð¿Ð¾Ð²ÐµÑ€Ð½ÑƒÐ² Ð¿Ð¾Ð¼Ð¸Ð»ÐºÑƒ.')
      const data = await response.json()
      if (!data.text) throw new Error('Ð¤Ð°ÐºÑ‚ Ð½Ðµ Ð·Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾.')
      setFact(data.text)
    } catch {
      setFactError('ÐÐµ Ð²Ð´Ð°Ð»Ð¾ÑÑ Ð·Ð°Ð²Ð°Ð½Ñ‚Ð°Ð¶Ð¸Ñ‚Ð¸ Ñ„Ð°ÐºÑ‚. ÐŸÐµÑ€ÐµÐ²Ñ–Ñ€Ñ‚Ðµ Ð¿Ñ–Ð´ÐºÐ»ÑŽÑ‡ÐµÐ½Ð½Ñ Ð´Ð¾ Ñ–Ð½Ñ‚ÐµÑ€Ð½ÐµÑ‚Ñƒ Ñ‚Ð° ÑÐ¿Ñ€Ð¾Ð±ÑƒÐ¹Ñ‚Ðµ Ñ‰Ðµ Ñ€Ð°Ð·.')
    } finally { setFactLoading(false) }
  }

  function addMovie(event) {
    event.preventDefault()
    if (!title.trim() || !genre.trim()) { setMovieError('Ð—Ð°Ð¿Ð¾Ð²Ð½Ñ–Ñ‚ÑŒ Ð½Ð°Ð·Ð²Ñƒ Ñ„Ñ–Ð»ÑŒÐ¼Ñƒ Ñ‚Ð° Ð¶Ð°Ð½Ñ€.'); return }
    setMovies(current => [...current, { id: crypto.randomUUID(), title: title.trim(), genre: genre.trim(), watched: false }])
    setTitle(''); setGenre(''); setMovieError('')
  }

  function toggleMovie(id) { setMovies(current => current.map(movie => movie.id === id ? { ...movie, watched: !movie.watched } : movie)) }

  return <main className="page-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><BookOpen size={18} /></span><span>campus<span className="brand-light">club</span></span></a><nav><a className="nav-active" href="#students">Ð¡Ñ‚ÑƒÐ´ÐµÐ½Ñ‚Ð¸</a><a href="#movies">ÐœÑ–Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº</a></nav><div className="topbar-right"><span className="semester"><span className="online-dot" /> ÐžÑÑ–Ð½Ð½Ñ–Ð¹ ÑÐµÐ¼ÐµÑÑ‚Ñ€ 2026</span><div className="user-avatar">Ð¯Ðš</div></div></header>

    <section className="welcome" id="top"><div className="welcome-copy"><div className="eyebrow"><Sparkles size={14} /> Ð’ÐÐ¨ Ð¡Ð¢Ð£Ð”Ð•ÐÐ¢Ð¡Ð¬ÐšÐ˜Ð™ ÐŸÐ ÐžÐ¡Ð¢Ð†Ð </div><h1>ÐŸÑ€Ð¸Ð²Ñ–Ñ‚, Ð¯Ñ€Ð¾ÑÐ»Ð°Ð²Ðµ<span className="wave"> âœ³</span></h1><p>Ð¢Ñ€Ð¾Ñ…Ð¸ Ð·Ð½Ð°Ð½ÑŒ, Ñ‚Ñ€Ð¾Ñ…Ð¸ ÐºÑ–Ð½Ð¾ Ñ– Ð²ÑÑ– ÑÐ²Ð¾Ñ— Ð² Ð¾Ð´Ð½Ð¾Ð¼Ñƒ Ð¼Ñ–ÑÑ†Ñ–.</p></div><div className="welcome-date"><span>Ð¡Ð•Ð Ð•Ð”Ð</span><strong>19 <span>Ð»Ð¸ÑÑ‚Ð¾Ð¿Ð°Ð´Ð°</span></strong></div></section>

    <section className="fact-card"><div className="fact-icon"><Lightbulb size={21} /></div><div className="fact-content"><div className="fact-label">Ð”ÐžÐ—Ð Ð¦Ð†ÐšÐÐ’ÐžÐ“Ðž <span>Â·</span> Ð¤ÐÐšÐ¢ Ð”ÐÐ¯</div><p className="fact-text" aria-live="polite">{factLoading ? <><LoaderCircle size={16} className="spin" /> Ð—Ð°Ð²Ð°Ð½Ñ‚Ð°Ð¶ÐµÐ½Ð½Ñ...</> : factError || fact}</p>{factError && <div className="fact-retry">ÐŸÐ¾Ð¿ÐµÑ€ÐµÐ´Ð½Ñ–Ð¹ Ñ„Ð°ÐºÑ‚: {starterFact}</div>}</div><button className="button button-dark fact-button" onClick={getFact} disabled={factLoading}>{factLoading ? 'Ð¨ÑƒÐºÐ°Ñ”Ð¼Ð¾â€¦' : 'Ð©Ðµ Ñ„Ð°ÐºÑ‚'} <span>â†—</span></button><span className="fact-decoration">âœ³</span></section>

    <section className="attendance-section"><Counter /></section>

    <section className="section-block" id="students"><div className="section-heading"><div><div className="section-kicker">ÐÐÐ¨Ð Ð¡ÐŸÐ†Ð›Ð¬ÐÐžÐ¢Ð</div><h2>ÐšÐ°Ñ‚Ð°Ð»Ð¾Ð³ ÑÑ‚ÑƒÐ´ÐµÐ½Ñ‚Ñ–Ð² <span className="heading-count">{filteredStudents.length}</span></h2></div><div className="section-controls"><label className="select-wrap"><GraduationCap size={16} /><select value={course} onChange={event => setCourse(event.target.value)} aria-label="Ð¤Ñ–Ð»ÑŒÑ‚Ñ€ Ð·Ð° ÐºÑƒÑ€ÑÐ¾Ð¼"><option value="all">Ð£ÑÑ– ÐºÑƒÑ€ÑÐ¸</option><option value="1">1 ÐºÑƒÑ€Ñ</option><option value="2">2 ÐºÑƒÑ€Ñ</option><option value="3">3 ÐºÑƒÑ€Ñ</option></select><ChevronDown size={14} /></label><button className="button button-outline toggle-students" onClick={() => setStudentsVisible(value => !value)}><Users size={15} /> {studentsVisible ? 'ÐŸÑ€Ð¸Ñ…Ð¾Ð²Ð°Ñ‚Ð¸' : 'ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸'} ÑÑ‚ÑƒÐ´ÐµÐ½Ñ‚Ñ–Ð²</button></div></div>
      {studentsVisible ? <><div className="student-grid">{filteredStudents.map(student => <StudentCard key={student.id} {...student} />)}</div><p className="result-note">ÐŸÐ¾ÐºÐ°Ð·Ð°Ð½Ð¾ <strong>{filteredStudents.length}</strong> Ð· {students.length} ÑÑ‚ÑƒÐ´ÐµÐ½Ñ‚Ñ–Ð²</p></> : <div className="hidden-students"><Users size={20} /> Ð¡Ð¿Ð¸ÑÐ¾Ðº ÑÑ‚ÑƒÐ´ÐµÐ½Ñ‚Ñ–Ð² Ð¿Ñ€Ð¸Ñ…Ð¾Ð²Ð°Ð½Ð¾. <button onClick={() => setStudentsVisible(true)}>ÐŸÐ¾ÐºÐ°Ð·Ð°Ñ‚Ð¸ ÑÐ¿Ð¸ÑÐ¾Ðº</button></div>}
    </section>

    <section className="section-block movies-section" id="movies"><div className="section-heading"><div><div className="section-kicker">ÐÐ Ð’Ð•Ð§Ð†Ð  ÐÐ‘Ðž ÐÐ Ð’Ð˜Ð¥Ð†Ð”ÐÐ†</div><h2>ÐœÑ–Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ñ„Ñ–Ð»ÑŒÐ¼Ñ–Ð² <span className="heading-count">{movies.length}</span></h2></div><div className="movie-stats"><span><i className="stat-watched" /> {watchedCount} Ð¿ÐµÑ€ÐµÐ³Ð»ÑÐ½ÑƒÑ‚Ð¾</span><span><i className="stat-unwatched" /> {movies.length - watchedCount} Ñƒ Ð¿Ð»Ð°Ð½Ð°Ñ…</span></div></div>
      <div className="movie-layout"><div className="movie-panel"><div className="panel-heading"><div><Clapperboard size={17} /><h3>Watchlist</h3></div><span>{movies.length} Ñ„Ñ–Ð»ÑŒÐ¼Ð¸</span></div><MovieList movies={movies} onToggle={toggleMovie} /><div className="movie-progress"><span>ÐŸÑ€Ð¾Ð³Ñ€ÐµÑ Ð¿ÐµÑ€ÐµÐ³Ð»ÑÐ´Ñƒ</span><strong>{movies.length ? Math.round(watchedCount / movies.length * 100) : 0}%</strong><div className="progress-track"><span style={{ width: `${movies.length ? watchedCount / movies.length * 100 : 0}%` }} /></div></div></div>
        <aside className="add-movie-panel"><div className="form-icon"><Film size={18} /></div><div className="section-kicker">ÐŸÐžÐŸÐžÐ’ÐÐ†Ð¢Ð¬ Ð¡ÐŸÐ˜Ð¡ÐžÐš</div><h3>Ð©Ð¾ Ð¿Ð¾Ð´Ð¸Ð²Ð¸Ð¼Ð¾ÑÑ?</h3><p>Ð—Ð±ÐµÑ€ÐµÐ¶Ñ–Ñ‚ÑŒ Ñ„Ñ–Ð»ÑŒÐ¼, Ñ‰Ð¾Ð± Ð½Ðµ Ð·Ð°Ð³ÑƒÐ±Ð¸Ñ‚Ð¸ Ð¹Ð¾Ð³Ð¾ ÑÐµÑ€ÐµÐ´ Ñ€ÐµÐºÐ¾Ð¼ÐµÐ½Ð´Ð°Ñ†Ñ–Ð¹.</p><form onSubmit={addMovie}><label htmlFor="movie-title">ÐÐ°Ð·Ð²Ð° Ñ„Ñ–Ð»ÑŒÐ¼Ñƒ</label><input id="movie-title" value={title} onChange={event => setTitle(event.target.value)} placeholder="ÐÐ°Ð¿Ñ€Ð¸ÐºÐ»Ð°Ð´, ÐŸÐ¾Ñ‡Ð°Ñ‚Ð¾Ðº" maxLength={80} /><label htmlFor="movie-genre">Ð–Ð°Ð½Ñ€</label><input id="movie-genre" value={genre} onChange={event => setGenre(event.target.value)} placeholder="ÐÐ°Ð¿Ñ€Ð¸ÐºÐ»Ð°Ð´, Ñ‚Ñ€Ð¸Ð»ÐµÑ€" maxLength={50} />{movieError && <p className="form-error" role="alert">{movieError}</p>}<button className="button button-dark add-button" type="submit"><Plus size={16} /> Ð”Ð¾Ð´Ð°Ñ‚Ð¸ Ñ„Ñ–Ð»ÑŒÐ¼</button></form><div className="saved-note"><Check size={13} /> Ð¡Ð¿Ð¸ÑÐ¾Ðº Ð·Ð±ÐµÑ€Ñ–Ð³Ð°Ñ”Ñ‚ÑŒÑÑ Ð°Ð²Ñ‚Ð¾Ð¼Ð°Ñ‚Ð¸Ñ‡Ð½Ð¾</div></aside></div>
    </section>

    <footer><span className="brand-mark footer-mark"><BookOpen size={15} /></span><span>Ð—Ñ€Ð¾Ð±Ð»ÐµÐ½Ð¾ Ð· Ñ†Ñ–ÐºÐ°Ð²Ñ–ÑÑ‚ÑŽ</span><span className="footer-right"><Clock3 size={13} /> campusclub Â· 2026</span></footer>
  </main>
}

