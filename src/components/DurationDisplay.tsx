import { FC } from 'react'

import { css } from '@/styled-system/css'
import { flex } from '@/styled-system/patterns'
import { DurationTextBox } from '@/components/DurationTextBox'
import { KeysType } from '@/types'

export type Props = {
  durations: KeysType<number | null>
}

const width = 3
const margin = 1

export const DurationDisplay: FC<Props> = ({ durations }) => {
  return (
    <div className={''}>
      <div>
        {[1, 3, 5].map((i) => (
          <DurationTextBox
            key={i}
            duration={durations[i]}
            className={css({
              display: 'inline-block',
              width: `${width}em`,
              marginLeft: `${margin}em`,
              _first: {
                marginLeft: `${(width + margin) / 2}em`,
              },
            })}
          />
        ))}
      </div>
      <div>
        {[0, 2, 4, 6].map((i) => (
          <DurationTextBox
            key={i}
            duration={durations[i]}
            className={css({
              display: 'inline-block',
              width: `${width}em`,
              marginLeft: `${margin}em`,
              _first: {
                marginLeft: 0,
              },
            })}
          />
        ))}
      </div>
    </div>
  )
}
