import {BEGIN_SELECTION, END_SELECTION, SELECT_ALL} from '../actions/actions'
import calendarData from '../calendarData.json'

const initalState = calendarData

const replaceLastElementInArray = (arr, etValue) => {
  let lastElement = arr[arr.length - 1]
  return [...arr.slice(0, arr.length - 1), {...lastElement, et: etValue}]
}

export default function (state = initalState, action) {  
  switch (action.type) { 
    case BEGIN_SELECTION:
    return {
      ...state,
      [action.payload.day]: [...state[action.payload.day], {bt: action.payload.hour * 60}]
    }
    case END_SELECTION:
      return {
        ...state,
        [action.payload.day]: replaceLastElementInArray(state[action.payload.day], action.payload.hour * 60) 
      }
    case SELECT_ALL:
      return {
        ...state,
        [action.payload.day]: {bt: 0, et: 24 * 60 - 1}
      }
    default:
      return state
  }
}