export const BEGIN_SELECTION = 'BEGIN_SELECTION'
export const END_SELECTION = 'END SELECTION'
export const SELECT_ALL = 'SELECT_ALL'

export const beginSelected = (day, hour) => {
  return {
    type: BEGIN_SELECTION,
    payload: {
      day, hour
    }
  }
}

export const endSelected = (day, hour) => {
  return {
    type: END_SELECTION,
    payload: {
      day, hour
    }
  }
}

export const selectAll = day => {
  return {
    type: SELECT_ALL,
    payload: {day}
  }
}