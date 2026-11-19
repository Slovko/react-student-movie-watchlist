import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

export default function Counter() {
  const [count, setCount] = useState(24)
  return <div className="attendance-widget">
    <div><span className="widget-label">ВІДВІДУВАННЯ СЬОГОДНІ</span><div className="counter-value">{count}<span> осіб</span></div></div>
    <div className="counter-actions"><button className="button button-dark button-small" onClick={() => setCount(value => value + 1)}>+ Відмітити</button><button className="reset-button" onClick={() => setCount(0)} aria-label="Скинути лічильник"><RotateCcw size={15} /> Скинути</button></div>
  </div>
}
