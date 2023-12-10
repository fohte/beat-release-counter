import { FC } from 'react'

import { DurationText } from '@/components/DurationText'
import { KeysType } from '@/types'

export type Props = {
  durations: KeysType<number | null>
}

export const DurationDisplay: FC<Props> = ({ durations }) => {
  return (
    <div>
      {[...Array(7).keys()].map((index) => {
        const duration = durations[index]
        return (
          <p key={index}>
            {index}: <DurationText duration={duration} />
          </p>
        )
      })}
    </div>
  )
}
