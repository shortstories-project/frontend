import React from 'react'
import { styled } from 'linaria/react'
import Downshift from 'downshift'

const defaultFilterResult = (item, inputValue, stringField) =>
  !inputValue ||
  item[stringField].toLowerCase().includes(inputValue.toLowerCase())

const Wrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  font-size: 2.1rem;
  line-height: 1.4;
  margin-bottom: 20px;
`

const List = styled.ul`
  font-size: 2.1rem;
  line-height: 1.4;
  font-family: var(--text-font);
  position: absolute;
  display: block;
  width: 100%;
  padding: 10px 0;
  box-shadow: var(--box-shadow);
  background-color: var(--white);
`

const Item = styled.li`
  cursor: pointer;
  padding: 10px;
  margin: 0 10px;
  background-color: var(--white);
  color: var(--black);
  border-radius: 4px;
  transition: all 0.2s ease;
  &:hover {
    background-color: var(--soft-violet);
    color: var(--white);
  }
`

function Autocomplete({
  onSelect,
  stringField,
  input,
  items,
  filterResult = defaultFilterResult,
}) {
  return (
    <Downshift
      onChange={onSelect}
      itemToString={item => (item ? item[stringField] : '')}
      id={input.id}
      labelId="autocomplete-label"
      inputId="autocomplete-input"
      menuId="autocomplete-menu"
    >
      {({ getInputProps, getItemProps, getRootProps, isOpen, inputValue }) => (
        <Wrapper {...getRootProps()}>
          <Input {...getInputProps(input)} />
          {isOpen && !!items.length ? (
            <List>
              {items
                .filter(item => filterResult(item, inputValue, stringField))
                .map((item, index) => (
                  <Item {...getItemProps({ key: index, index, item })}>
                    {item[stringField]}
                  </Item>
                ))}
            </List>
          ) : null}
        </Wrapper>
      )}
    </Downshift>
  )
}

export default Autocomplete
