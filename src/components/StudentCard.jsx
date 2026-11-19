import { ArrowUpRight } from 'lucide-react'

export default function StudentCard({ name, age, course, initials, color, field }) {
  return <article className="student-card">
    <div className={`avatar avatar-${color}`}>{initials}</div>
    <div className="student-details"><h3>{name}</h3><p>{field}</p></div>
    <span className="student-open"><ArrowUpRight size={15} /></span>
    <div className="student-meta"><span>{age} років</span><span className="meta-dot" /><span>{course} курс</span></div>
  </article>
}
