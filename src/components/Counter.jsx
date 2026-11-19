import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

export default function Counter() {
  const [count, setCount] = useState(24)
  return <div className="attendance-widget">
    <div><span className="widget-label">Ð’Ð†Ð”Ð’Ð†Ð”Ð£Ð’ÐÐÐÐ¯ Ð¡Ð¬ÐžÐ“ÐžÐ”ÐÐ†</span><div className="counter-value">{count}<span> Ð¾ÑÑ–Ð±</span></div></div>
    <div className="counter-actions"><button className="button button-dark button-small" onClick={() => setCount(value => value + 1)}>+ Ð’Ñ–Ð´Ð¼Ñ–Ñ‚Ð¸Ñ‚Ð¸</button><button className="reset-button" onClick={() => setCount(0)} aria-label="Ð¡ÐºÐ¸Ð½ÑƒÑ‚Ð¸ Ð»Ñ–Ñ‡Ð¸Ð»ÑŒÐ½Ð¸Ðº"><RotateCcw size={15} /> Ð¡ÐºÐ¸Ð½ÑƒÑ‚Ð¸</button></div>
  </div>
}

