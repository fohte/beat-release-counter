import { FC } from 'react'

import { css, cx } from '@/styled-system/css'
import { DurationText } from '@/components/DurationText'

export type Props = {
  duration: number | null
  className?: string
}

export const DurationTextBox: FC<Props> = ({ duration, className }) => {
  return (
    <div
      className={cx(
        css({
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'gray.400',
          textAlign: 'center',
        }),
        className
      )}
    >
      <DurationText duration={duration} />
    </div>
  )
}
