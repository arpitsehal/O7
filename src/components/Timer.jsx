import { useEffect, useRef, useState } from 'react'

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const s = (totalSeconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

function Timer({ totalSeconds, onExpire }) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const expiredRef = useRef(false)

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true
        onExpire?.()
      }
      return
    }
    const id = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(id)
  }, [secondsLeft, onExpire])

  const isLow = secondsLeft <= 30
  return (
    <span className={`timer ${isLow ? 'low' : ''}`}>
      {formatTime(Math.max(secondsLeft, 0))}
    </span>
  )
}

export default Timer
