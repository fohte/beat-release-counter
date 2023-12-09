import { FC, useState, useEffect } from 'react'

import { getGamepads } from '@/app/getGamepads'

export type Props = {
  onChange: (gamepadIndex: number | null) => void
}

export const GamepadSelect: FC<Props> = ({ onChange }) => {
  const [allGamepads, setAllGamepads] = useState<Gamepad[]>([])

  useEffect(() => {
    setAllGamepads(getGamepads())
  }, [])

  return (
    <div>
      Select Gamepad:
      <select
        onChange={(event) => {
          const value = event.target.value
          console.log(value)
          if (value == 'None') {
            onChange(null)
          } else {
            onChange(Number(value))
          }
        }}
      >
        <option value="None">None</option>
        {allGamepads.map((gamepad) => (
          <option key={gamepad.index} value={gamepad.index}>
            {gamepad.id}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          setAllGamepads(getGamepads())
        }}
      >
        Refresh
      </button>
    </div>
  )
}
