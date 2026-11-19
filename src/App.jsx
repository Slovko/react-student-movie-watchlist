import { useEffect, useMemo, useState } from 'react'
import { BookOpen, Check, ChevronDown, Clapperboard, Clock3, Film, GraduationCap, Lightbulb, LoaderCircle, Plus, Sparkles, Users } from 'lucide-react'
import StudentCard from './components/StudentCard.jsx'
import Counter from './components/Counter.jsx'
import MovieList from './components/MovieList.jsx'
import { initialMovies, students } from './data.js'

const STORAGE_KEY = 'student-space-movies-v1'
const starterFact = 'Восьминіг має три серця, а його кров має блакитний колір.'

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
      if (!response.ok) throw new Error('Сервер повернув помилку.')
      const data = await response.json()
      if (!data.text) throw new Error('Факт не знайдено.')
      setFact(data.text)
    } catch {
      setFactError('Не вдалося завантажити факт. Перевірте підключення до інтернету та спробуйте ще раз.')
    } finally { setFactLoading(false) }
  }

  function addMovie(event) {
    event.preventDefault()
    if (!title.trim() || !genre.trim()) { setMovieError('Заповніть назву фільму та жанр.'); return }
    setMovies(current => [...current, { id: crypto.randomUUID(), title: title.trim(), genre: genre.trim(), watched: false }])
    setTitle(''); setGenre(''); setMovieError('')
  }

  function toggleMovie(id) { setMovies(current => current.map(movie => movie.id === id ? { ...movie, watched: !movie.watched } : movie)) }

  return <main className="page-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark"><BookOpen size={18} /></span><span>campus<span className="brand-light">club</span></span></a><nav><a className="nav-active" href="#students">Студенти</a><a href="#movies">Мій список</a></nav><div className="topbar-right"><span className="semester"><span className="online-dot" /> Осінній семестр 2026</span><div className="user-avatar">ЯК</div></div></header>

    <section className="welcome" id="top"><div className="welcome-copy"><div className="eyebrow"><Sparkles size={14} /> ВАШ СТУДЕНТСЬКИЙ ПРОСТІР</div><h1>Привіт, Ярославе<span className="wave"> ✳</span></h1><p>Трохи знань, трохи кіно і всі свої в одному місці.</p></div><div className="welcome-date"><span>СЕРЕДА</span><strong>19 <span>листопада</span></strong></div></section>

    <section className="fact-card"><div className="fact-icon"><Lightbulb size={21} /></div><div className="fact-content"><div className="fact-label">ДОЗА ЦІКАВОГО <span>·</span> ФАКТ ДНЯ</div><p className="fact-text" aria-live="polite">{factLoading ? <><LoaderCircle size={16} className="spin" /> Завантаження...</> : factError || fact}</p>{factError && <div className="fact-retry">Попередній факт: {starterFact}</div>}</div><button className="button button-dark fact-button" onClick={getFact} disabled={factLoading}>{factLoading ? 'Шукаємо…' : 'Ще факт'} <span>↗</span></button><span className="fact-decoration">✳</span></section>

    <section className="attendance-section"><Counter /></section>

    <section className="section-block" id="students"><div className="section-heading"><div><div className="section-kicker">НАША СПІЛЬНОТА</div><h2>Каталог студентів <span className="heading-count">{filteredStudents.length}</span></h2></div><div className="section-controls"><label className="select-wrap"><GraduationCap size={16} /><select value={course} onChange={event => setCourse(event.target.value)} aria-label="Фільтр за курсом"><option value="all">Усі курси</option><option value="1">1 курс</option><option value="2">2 курс</option><option value="3">3 курс</option></select><ChevronDown size={14} /></label><button className="button button-outline toggle-students" onClick={() => setStudentsVisible(value => !value)}><Users size={15} /> {studentsVisible ? 'Приховати' : 'Показати'} студентів</button></div></div>
      {studentsVisible ? <><div className="student-grid">{filteredStudents.map(student => <StudentCard key={student.id} {...student} />)}</div><p className="result-note">Показано <strong>{filteredStudents.length}</strong> з {students.length} студентів</p></> : <div className="hidden-students"><Users size={20} /> Список студентів приховано. <button onClick={() => setStudentsVisible(true)}>Показати список</button></div>}
    </section>

    <section className="section-block movies-section" id="movies"><div className="section-heading"><div><div className="section-kicker">НА ВЕЧІР АБО НА ВИХІДНІ</div><h2>Мій список фільмів <span className="heading-count">{movies.length}</span></h2></div><div className="movie-stats"><span><i className="stat-watched" /> {watchedCount} переглянуто</span><span><i className="stat-unwatched" /> {movies.length - watchedCount} у планах</span></div></div>
      <div className="movie-layout"><div className="movie-panel"><div className="panel-heading"><div><Clapperboard size={17} /><h3>Watchlist</h3></div><span>{movies.length} фільми</span></div><MovieList movies={movies} onToggle={toggleMovie} /><div className="movie-progress"><span>Прогрес перегляду</span><strong>{movies.length ? Math.round(watchedCount / movies.length * 100) : 0}%</strong><div className="progress-track"><span style={{ width: `${movies.length ? watchedCount / movies.length * 100 : 0}%` }} /></div></div></div>
        <aside className="add-movie-panel"><div className="form-icon"><Film size={18} /></div><div className="section-kicker">ПОПОВНІТЬ СПИСОК</div><h3>Що подивимося?</h3><p>Збережіть фільм, щоб не загубити його серед рекомендацій.</p><form onSubmit={addMovie}><label htmlFor="movie-title">Назва фільму</label><input id="movie-title" value={title} onChange={event => setTitle(event.target.value)} placeholder="Наприклад, Початок" maxLength={80} /><label htmlFor="movie-genre">Жанр</label><input id="movie-genre" value={genre} onChange={event => setGenre(event.target.value)} placeholder="Наприклад, трилер" maxLength={50} />{movieError && <p className="form-error" role="alert">{movieError}</p>}<button className="button button-dark add-button" type="submit"><Plus size={16} /> Додати фільм</button></form><div className="saved-note"><Check size={13} /> Список зберігається автоматично</div></aside></div>
    </section>

    <footer><span className="brand-mark footer-mark"><BookOpen size={15} /></span><span>Зроблено з цікавістю</span><span className="footer-right"><Clock3 size={13} /> campusclub · 2026</span></footer>
  </main>
}
