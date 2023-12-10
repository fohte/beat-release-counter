import { isNotNull } from 'typesafe-utils'

export const getGamepads = (): Gamepad[] =>
  typeof navigator !== 'undefined' && navigator.getGamepads
    ? navigator.getGamepads().filter(isNotNull)
    : []
