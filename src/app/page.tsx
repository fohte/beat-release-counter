'use client'

import { useState } from 'react'

import { DurationCalculator } from '@/components/DurationCalculator'
import { GamepadSelect } from '@/components/GamepadSelect'

export default function Home() {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null)

  return (
    <div>
      <GamepadSelect onChange={setGamepadIndex} />
      {gamepadIndex != null && (
        <DurationCalculator gamepadIndex={gamepadIndex} />
      )}
    </div>
  )
}
