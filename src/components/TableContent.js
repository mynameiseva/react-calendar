import React, { Component } from 'react'
import {connect} from 'react-redux'
import {beginSelected, endSelected, selectAll} from '../actions/actions'
import {range} from 'rambda'
import styled from 'styled-components'

const Table = styled.div`
  width: 528px;
  display: flex;
  flex-direction: column;
`

const Row = styled.div`
  width: 100%;
  display: flex;
`

const Cell = styled.div`
  width: 20px;
  height: 40px;
  background: #333333;
  border: 1px solid black; 
`

const DaysColl = styled.div`
  width: 40px;
  height: 40px;
  background: blue;
  border: 1px solid black;
`

const AlldayColl = styled.div`
  width: 40px;
  height: 40px;
  background: grey;
  border: 1px solid black;
`

export class TableContent extends Component {
  constructor() {
    super()
    this.state = {
      selectingRange: false
    }
  }

  handleUserClick = (day, hour) => {
    const {selectingRange} = this.state
    const {beginSelected, endSelected} = this.props

    if (selectingRange)
      this.setState({selectingRange: false}, () => endSelected(day, hour))
    else {
      this.setState({selectingRange: true}, () => beginSelected(day, hour))
    }
  }

  render() {
    const {data, selectAll} = this.props
    
    return (
      <Table>
        {Object.keys(data).map((day, index) => {
          return (
            <Row key={index}>
              <DaysColl>{day}</DaysColl>
              <AlldayColl onClick={() => selectAll(day)}></AlldayColl>
              {range(1, 25).map(hour => {
                return (
                  <Cell 
                    key={hour} 
                    onClick={() => this.handleUserClick(day, hour)}
                    
                    > 
                  </Cell>
               )
              })}
            </Row>
          )
        })}
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
    data: state.calendarData
  }
}

export default connect(mapStateToProps, {beginSelected, endSelected, selectAll})(TableContent)
