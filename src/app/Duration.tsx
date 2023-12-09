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

export const Duration: FC<Props> = ({ duration }) => {
  const durationString = duration == null ? '-' : `${duration.toFixed(0)} ms`
  return (
    <span
      className={
        duration == null
          ? undefined
          : duration < 40
            ? blueStyle
            : duration < 45
              ? greenStyle
              : duration < 60
                ? yellowStyle
                : duration < 70
                  ? orangeStyle
                  : redStyle
      }
    >
      {durationString}
    </span>
  )
}
