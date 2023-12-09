'use client'

import { useState } from 'react'

import { Judge } from '@/app/Judge'
import { GamepadSelect } from '@/app/GamepadSelect'

export default function Home() {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null)

  return (
    <div>
      <GamepadSelect onChange={setGamepadIndex} />
      {gamepadIndex != null && <Judge gamepadIndex={gamepadIndex} />}
    </div>
  )
}
