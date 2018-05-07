export const SELECT_ALL = 'SELECT_ALL'
export const RANGE_SELECTED = 'RANGE_SELECTED'
export const CLEAR_ALL = 'CLEAR_ALL'

export const selectAll = day => {
  return {
    type: SELECT_ALL,
    payload: {day}
  }
}

export const clearAll = day => {
  return {
    type: CLEAR_ALL,
    payload: {day}
  }
}

export const rangeSelected = (day, startHour, endHour) => {
  return {
    type: RANGE_SELECTED,
    payload: {day, startHour, endHour}
  }
}
