import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Hour from './Hour'
import {range} from 'ramda'
import {selectAll, rangeSelected, clearAll} from '../actions/actions'
import {fromBtToHour, fromEtToHour} from '../helpers'

const DayLabel = styled.div`
  width: 40px;
  height: 40px;
  background: grey;
  border: 1px solid black;
  text-align: center;
  vertical-align: center; 
  color: white;
`

const AllDaysSelector = styled.div`
  width: 40px;
  height: 40px;
  background: grey;
  border: 1px solid black;
`

const Row = styled.div`
  width: 100%;
  display: flex;
`

class Day extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSelectingRange: false,
      beginSelectionHour: null,
      isSelectedAll: false
    }

    this.handleHourClick = this.handleHourClick.bind(this)
  }

  handleHourClick(hour) {
    const {name, rangeSelected} = this.props
    const {isSelectingRange} = this.state

    if (isSelectingRange) {
      this.setState({isSelectingRange: false}, () => rangeSelected(name, this.state.beginSelectionHour, hour))
    } else {
      this.setState({isSelectingRange: true, beginSelectionHour: hour})
    }
  }

  inSelectedRanges(hour) {
    const {timeRanges} = this.props

    return timeRanges.some(({bt, et}) => (hour >= fromBtToHour(bt)) && (hour <= fromEtToHour(et)))
  }

  selectAllHandler(day) {
    const {clearAll, selectAll} = this.props
    const {isSelectedAll} = this.state

    if(isSelectedAll) {
      this.setState({isSelectedAll: false}, () => clearAll(day))  
      
    }
    else {
      this.setState({isSelectedAll: true}, () => selectAll(day))
    }

  }

  render() {
    const {name} = this.props

    return (
      <Row>
        <DayLabel>{name}</DayLabel>
        <AllDaysSelector onClick={() => this.selectAllHandler(name)} />
        {range(1, 25).map(hour =>
          <Hour
            key={hour}
            isSelected={this.inSelectedRanges(hour)}
            onClick={() => this.handleHourClick(hour)}
          />
        )}
      </Row>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  timeRanges: state.calendar[ownProps.name]
})

const mapDispatchToProps = dispatch => ({
  rangeSelected: (day, startHour, endHour) => dispatch(rangeSelected(day, startHour, endHour)),
  selectAll: day => dispatch(selectAll(day)),
  clearAll: day => dispatch(clearAll(day))
})

export default connect(mapStateToProps, mapDispatchToProps)(Day)
