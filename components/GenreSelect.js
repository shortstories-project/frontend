import React from 'react'
import { css } from 'linaria'
import cn from 'classnames'
import Downshift from 'downshift'
import { array, func, bool, object } from 'prop-types'

const wrapper = css`
  position: relative;
`

const input = css`
  font-size: 2.1rem;
  line-height: 1.4;
`

const hideList = css`
  display: none !important;
`

const darkList = css`
  background-color: var(--night-grey) !important;
`

const list = css`
  font-size: 2.1rem;
  line-height: 1.4;
  font-family: var(--text-font);
  position: absolute;
  display: block;
  margin-top: 12px;
  border-radius: 4px;
  width: 100%;
  padding: 10px 0;
  box-shadow: var(--box-shadow);
  background-color: var(--white);
`

const listItem = css`
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

const darkListItem = css`
  background-color: var(--night-grey);
`

const selectedListItem = css`
  background-color: var(--soft-violet);
  color: var(--white);
`

const filterResult = (item, inputValue) =>
  !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase())

function GenreSelect({ items, onSelect, isDarkMode, initialSelectedItem = null }) {
  const getFilteredItems = inputValue =>
    items.filter(item => filterResult(item, inputValue))
  return (
    <Downshift
      onChange={onSelect}
      itemToString={item => (item ? item.name : '')}
      initialSelectedItem={initialSelectedItem}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
      }) => (
        <div className={wrapper}>
          <input
            {...getInputProps({
              className: input,
              placeholder: 'Выберите жанр',
            })}
          />
          <ul
            {...getMenuProps({
              className: cn(list, {
                [hideList]: !isOpen || !getFilteredItems(inputValue).length,
                [darkList]: isDarkMode,
              }),
            })}
          >
            {isOpen
              ? getFilteredItems(inputValue).map((item, index) => (
                  <li
                    {...getItemProps({
                      key: item.name,
                      index,
                      item,
                      className: cn(listItem, {
                        [selectedListItem]: highlightedIndex === index,
                        [darkListItem]: isDarkMode,
                      }),
                    })}
                  >
                    {item.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  )
}

GenreSelect.propTypes = {
  items: array.isRequired,
  onSelect: func.isRequired,
  isDarkMode: bool.isRequired,
  initialSelectedItem: object,
}

export default GenreSelect
