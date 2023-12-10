import { FC } from 'react'

import { css } from '@/styled-system/css'

export type Props = {
  duration: number | null
}

const blueStyle = css({ color: 'blue.400' })
const greenStyle = css({ color: 'green.400' })
const yellowStyle = css({ color: 'yellow.400' })
const orangeStyle = css({ color: 'orange.400' })
const redStyle = css({ color: 'red.400' })

const BLUE_THRESHOLD = 40 as const
const GREEN_THRESHOLD = 45 as const
const YELLOW_THRESHOLD = 60 as const
const ORANGE_THRESHOLD = 70 as const

export const DurationText: FC<Props> = ({ duration }) => {
  const durationString = duration == null ? '-' : `${duration.toFixed(0)} ms`
  return (
    <span
      className={
        duration == null
          ? undefined
          : duration < BLUE_THRESHOLD
            ? blueStyle
            : duration < GREEN_THRESHOLD
              ? greenStyle
              : duration < YELLOW_THRESHOLD
                ? yellowStyle
                : duration < ORANGE_THRESHOLD
                  ? orangeStyle
                  : redStyle
      }
    >
      {durationString}
    </span>
  )
}
