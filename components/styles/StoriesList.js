import { styled } from 'linaria/react'

const StoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
  max-width: 1300px;
  margin: 0 auto;
`

export default StoriesList
