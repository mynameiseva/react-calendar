import {SELECT_ALL, RANGE_SELECTED, CLEAR_ALL} from '../actions/actions'
import calendarData from '../calendarData.json'
import {hourToBt, hourToEt} from '../helpers'
import {prop, ascend, sort, last} from 'ramda'

const initalState = calendarData

const insertRange = (array, startHour, endHour) => {
  const [rstart, rend] = [hourToBt(startHour), hourToEt(endHour)]
  const [start, end] = rstart > rend ? [rend, rstart] : [rstart, rend]

  const byStart = ascend(prop('bt'))
  const sorted = sort(byStart, [{bt: start, et: end}, ...array])

  return sorted.reduce((mergedRanges, current) => {
    const lastMergedRange = last(mergedRanges)

    if (lastMergedRange.et < current.bt) {
      return [...mergedRanges, current]
    } else if (lastMergedRange.et < current.et) {
      return [...mergedRanges.slice(0, -1), {bt: lastMergedRange.bt, et: current.et}]
    } else {
      return mergedRanges
    }
  }, [sorted[0]])
}

export default function (state = initalState, action) {  
  switch (action.type) {
    case RANGE_SELECTED:
      return {
        ...state,
        [action.payload.day]: insertRange(state[action.payload.day], action.payload.startHour, action.payload.endHour)
      }
    case SELECT_ALL:
      return {
        ...state,
        [action.payload.day]: [{bt: 0, et: hourToEt(24)}]
      }
    case CLEAR_ALL:
    return {
      ...state,
      [action.payload.day]: []
    }
    default:
      return state
  }
}
