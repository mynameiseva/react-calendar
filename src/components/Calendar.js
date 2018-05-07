import React, { Component } from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Day from './Day'

const Table = styled.div`
  width: 528px;
  display: flex;
  flex-direction: column;
`

class Calendar extends Component {
  render() {
    const {calendar} = this.props

    return (
      <Table>
        {Object.keys(calendar).map((day, index) =>
          <Day name={day} key={index} />
        )}
      </Table>
    )
  }
}

const takeCalendarData = state => ({calendar: state.calendar})

export default connect(takeCalendarData)(Calendar)
