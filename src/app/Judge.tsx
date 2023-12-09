'use client'

import { useRef, useCallback, useEffect, useState, FC } from 'react'

import { getGamepads } from '@/app/getGamepads'

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

export const Judge: FC<Props> = ({ gamepadIndex }) => {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [duration, setDuration] = useState<number | null>(null)

  useAnimationFrame(() => {
    const gamepad = getGamepads()[gamepadIndex]
    if (gamepad == null) {
      return
    }
    const buttonPressed = gamepad.buttons[0].pressed
    if (buttonPressed && startTime === null) {
      setStartTime(performance.now())
    } else if (!buttonPressed && startTime !== null) {
      const endTime = performance.now()
      setDuration(endTime - startTime)
      setStartTime(null)
    }
  })

  return <div>{duration !== null && <p>{duration.toFixed(0)} ms</p>}</div>
}
