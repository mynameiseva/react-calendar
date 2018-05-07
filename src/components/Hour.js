import styled from 'styled-components'

const Cell = styled.div`
  width: 20px;
  height: 40px;
  background: ${props => props.isSelected ? "red" : "#333333"};
  border: 1px solid black; 
`

export default Cell
