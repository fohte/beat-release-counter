'use client'

import { useState } from 'react'

import { Judge } from '@/components/Judge'
import { GamepadSelect } from '@/components/GamepadSelect'

export default function Home() {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null)

  return (
    <div>
      <GamepadSelect onChange={setGamepadIndex} />
      {gamepadIndex != null && <Judge gamepadIndex={gamepadIndex} />}
    </div>
  )
}
