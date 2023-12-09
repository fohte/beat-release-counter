'use client'

import { useRef, useCallback, useEffect, useState, FC } from 'react'

import { getGamepads } from '@/app/getGamepads'

type KeysType<T> = [T, T, T, T, T, T, T]

export type Props = {
  gamepadIndex: number
}

const useAnimationFrame = (callback = () => {}) => {
  const reqIdRef = useRef<number | null>(null)
  const loop = useCallback(() => {
    reqIdRef.current = requestAnimationFrame(loop)
    callback()
  }, [callback])

  useEffect(() => {
    reqIdRef.current = requestAnimationFrame(loop)
    return () => {
      if (reqIdRef.current != null) {
        cancelAnimationFrame(reqIdRef.current)
      }
    }
  }, [loop])
}

const RESET_JUDGE_DURATION = 500 as const
const TREAT_AS_LONG_NOTE_DURATION = 250 as const

export const Judge: FC<Props> = ({ gamepadIndex }) => {
  const [startTimes, setStartTimes] = useState<KeysType<number | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ])
  const [durations, setDurations] = useState<KeysType<number | null>>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ])
  const [latestEndTimes, setLatestEndTimes] = useState<KeysType<number | null>>(
    [null, null, null, null, null, null, null]
  )

  useAnimationFrame(() => {
    const gamepad = getGamepads()[gamepadIndex]
    if (gamepad == null) {
      return
    }
    const buttons = gamepad.buttons
    const newStartTimes: KeysType<number | null> = [...startTimes]
    const newDurations: KeysType<number | null> = [...durations]
    const newLatestEndTimes: KeysType<number | null> = [...latestEndTimes]

    ;[...Array(7).keys()].forEach((index) => {
      const button = buttons[index]
      const buttonPressed = button.pressed
      const startTime = newStartTimes[index]
      const latestEndTime = newLatestEndTimes[index]

      if (
        latestEndTime !== null &&
        performance.now() - latestEndTime > RESET_JUDGE_DURATION
      ) {
        newDurations[index] = null
        newLatestEndTimes[index] = null
      }

      if (buttonPressed) {
        // button pressed
        if (startTime === null) {
          const newStartTime = performance.now()
          newStartTimes[index] = newStartTime
        }
      } else {
        // button released
        if (startTime !== null) {
          newStartTimes[index] = null

          const endTime = performance.now()
          if (endTime - startTime < TREAT_AS_LONG_NOTE_DURATION) {
            newDurations[index] = endTime - startTime
            newLatestEndTimes[index] = endTime
          }
        }
      }
    })

    setStartTimes(newStartTimes)
    setDurations(newDurations)
    setLatestEndTimes(newLatestEndTimes)
  })

  return (
    <div>
      {[...Array(7).keys()].map((index) => {
        const duration = durations[index]
        return (
          <p key={index}>
            {index}: {duration !== null ? duration.toFixed(0) : '-'} ms
          </p>
        )
      })}
    </div>
  )
}
