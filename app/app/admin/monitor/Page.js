'use client'
import { useState, useEffect } from 'react'

export default function Monitor() {
  const [state, setState] = useState('Texas')
  const [paused, setPaused] = useState(false)
  
  // PAUSE/RESUME - safe KV only
  async function togglePause() {
    await fetch('/api/kv', {
      method: 'POST',
      body: JSON.stringify({ key: 'venus:paused', value: !paused })
    })
    setPaused(!paused)
  }
  
  // UNLOCK
  async function unlock() {
    await fetch('/api/kv', { 
      method: 'DELETE', 
      body: JSON.stringify({ key: 'venus:locker' }) 
    })
  }

  return (
    <div>
      <button onClick={togglePause}>
        {paused ? 'RESUME BLAST' : 'PAUSE BLAST'}
      </button>
      <button onClick={unlock}>UNLOCK LOCKER</button>
      {/* ... rest of my dashboard UI ... */}
    </div>
  )
}
