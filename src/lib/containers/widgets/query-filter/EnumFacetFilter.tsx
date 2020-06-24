import * as React from 'react'

import {
  FacetColumnResultValueCount,
  ColumnModel,
} from '../../../utils/synapseTypes/Table'
import { Checkbox } from '../Checkbox'
import { SynapseConstants } from '../../../utils'
import { useState } from 'react'
import { EntityHeader } from '../../../utils/synapseTypes/EntityHeader'
import { UserProfile } from '../../../utils/synapseTypes'
import useGetInfoFromIds from '../../../utils/hooks/useGetInfoFromIds'
import { FacetFilterHeader } from './FacetFilterHeader'
import '../../../style/components/query_filter/_enum-facet-filter.scss'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faArrowLeft)

export type EnumFacetFilterProps = {
  facetValues: FacetColumnResultValueCount[]
  columnModel: ColumnModel
  token?: string
  onChange: Function
  onClear: Function
  facetAliases: {} | undefined
}

function valueToId(value: string): string {
  return value.replace(/\s/g, '').toLowerCase()
}

function valueToLabel(
  facet: FacetColumnResultValueCount,
  profiles: UserProfile[] = [],
  entityHeaders: EntityHeader[] = [],
): string {
  const { value } = facet
  let displayValue = value
  if (value === SynapseConstants.VALUE_NOT_SET) {
    displayValue = 'Not Set'
  }
  const profile = profiles.find(profile => profile.ownerId === value)
  if (profile) {
    displayValue = profile ? profile.userName : `unknown (${value})`
  }

  const eh = entityHeaders.find(eh => eh.id === value)
  if (eh) {
    displayValue = eh ? eh.name : `unknown (${value})`
  }

  return `${displayValue}`
}

function formatFacetValuesForDisplay(
  facetValues: FacetColumnResultValueCount[],
  isShowAll: boolean,
  visibleItemsCount: number,
) {
  //sort facets by count
  const facets = [...facetValues.sort((a, b) => b.count - a.count)]
  if (isShowAll || facets.length <= visibleItemsCount) {
    return facets
  } else {
    //if we are not hiding elected facets
    if (facets.slice(visibleItemsCount).find(item => item.isSelected)) {
      return facets
    } else {
      return facets.splice(0, visibleItemsCount)
    }
  }
}

/************* QUERY ENUM CONMPONENT  *************/

export const EnumFacetFilter: React.FunctionComponent<EnumFacetFilterProps> = ({
  token,
  facetValues,
  columnModel,
  onClear,
  onChange,
  facetAliases,
}: EnumFacetFilterProps) => {
  const [isShowAll, setIsShowAll] = useState<boolean>(false)
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
  const [showSearch, setShowSearch] = useState<boolean>(false)
  const [searchTerm, setSearchText] = useState<string>('')
  const [filteredSet, setFilteredSet] = useState<FacetColumnResultValueCount[]>(
    facetValues,
  )
  const visibleItemsCount = 5
  const selectionDelay = 1500 // in ms
  const textInput: React.RefObject<HTMLInputElement> = React.createRef()
  const selectedValuesMap = {}
  let timer: ReturnType<typeof setTimeout>

  const userIds =
    columnModel.columnType === 'USERID'
      ? facetValues.map(facet => facet.value)
      : []
  const userProfiles = useGetInfoFromIds<UserProfile>({
    ids: userIds,
    token,
    type: 'USER_PROFILE',
  })

  const entityIds =
    columnModel.columnType === 'ENTITYID'
      ? facetValues.map(facet => facet.value)
      : []
  const entityHeaders = useGetInfoFromIds<EntityHeader>({
    ids: entityIds,
    token,
    type: 'ENTITY_HEADER',
  })

  const handleTextInputFilterEvent = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputValue: string = e.target.value.trim()
    setSearchText(inputValue)
    setIsShowAll(true) // While in filter search mode, display all filtered values

    if (!inputValue) {
      // if input field is empty, display all facet values
      facetValues.forEach(obj => {
        obj.isSelected = false
      })
      setFilteredSet(facetValues)
    } else {
      // display only facet values that contain text from the text input field
      const filtered = facetValues.filter(obj => {
        const label = valueToLabel(obj, userProfiles, entityHeaders)
        return label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
          ? obj
          : null
      })
      setFilteredSet(filtered)
    }
  }

  if (!columnModel) {
    return <></>
  }

  return (
    <div className="EnumFacetFilter">
      <FacetFilterHeader
        facetAliases={facetAliases}
        isCollapsed={isCollapsed}
        label={columnModel.name}
        onClick={(isCollapsed: boolean) => setIsCollapsed(isCollapsed)}
      ></FacetFilterHeader>
      <div style={{ display: isCollapsed ? 'none' : 'block' }}>
        <div className="EnumFacetFilter__checkboxContainer--forAll">
          <div
            className={
              showSearch
                ? 'EnumFacetFilter__search active'
                : 'EnumFacetFilter__search'
            }
          >
            <button // Close Search Button
              className="EnumFacetFilter__closeSearch"
              onClick={() => {
                setFilteredSet(facetValues)
                setShowSearch(false)
                setIsShowAll(false)
              }}
            >
              <FontAwesomeIcon
                className="EnumFacetFilter__previous"
                icon={faArrowLeft}
              />
            </button>
            <button // Clear Search Filter Text Button
              className="EnumFacetFilter__resetSearch"
              onClick={() => {
                setSearchText('')
                textInput.current?.focus()
              }}
            >
              <FontAwesomeIcon
                className="EnumFacetFilter__reset"
                icon={'times'}
              />
            </button>
            <input // Search Filter Text
              type="text"
              placeholder="Find values"
              value={searchTerm}
              ref={textInput}
              onChange={e => {
                handleTextInputFilterEvent(e)
              }}
            />
          </div>
          {!showSearch && (
            <div className="EnumFacetFilter__checkAll">
              <Checkbox
                className="EnumFacetFilter__checkbox"
                onChange={() => onClear(columnModel.name)}
                key="select_all"
                checked={
                  facetValues.filter(item => item.isSelected).length === 0
                }
                label="All"
                id="select_all"
              ></Checkbox>
              <button
                className="EnumFacetFilter__searchbtn"
                onClick={() => {
                  setSearchText('')
                  setShowSearch(true)
                  textInput.current?.focus()
                }}
              >
                <FontAwesomeIcon
                  className="EnumFacetFilter__searchicon"
                  icon={'search'}
                />
              </button>
            </div>
          )}
        </div>
        <div>
          {filteredSet.length > 0 &&
            formatFacetValuesForDisplay(
              filteredSet,
              isShowAll,
              visibleItemsCount,
            ).map((facet, index: number) => {
              const id = valueToId(facet.value)
              return (
                <div
                  className="EnumFacetFilter__checkboxContainer"
                  key={`checkLabel${index}`}
                >
                  <Checkbox
                    className="EnumFacetFilter__checkbox"
                    onChange={(isChecked: boolean) => {
                      selectedValuesMap[facet.value] = isChecked
                      clearTimeout(timer)
                      timer = setTimeout(() => {
                        onChange(selectedValuesMap)
                      }, selectionDelay)
                    }}
                    key={id + index}
                    checked={facet.isSelected}
                    label={valueToLabel(facet, userProfiles, entityHeaders)}
                    id={id}
                  ></Checkbox>
                  <div className="EnumFacetFilter__count">{facet.count}</div>
                </div>
              )
            })}
          {!isShowAll && filteredSet.length > visibleItemsCount && (
            <button
              className="EnumFacetFilter__showMoreFacetsBtn"
              onClick={() => setIsShowAll(true)}
            >
              <div className="EnumFacetFilter__checkboxContainer">
                <div className="EnumFacetFilter__showMoreFacetsLabel">
                  Show more
                </div>
                <div className="EnumFacetFilter__howMoreFacetsCount">
                  {filteredSet.length}
                </div>
              </div>
            </button>
          )}
          {isShowAll && filteredSet.length > visibleItemsCount && (
            <button
              className="EnumFacetFilter__showMoreFacetsBtn"
              onClick={() => setIsShowAll(false)}
            >
              <div className="EnumFacetFilter__checkboxContainer">
                <div className="EnumFacetFilter__showMoreFacetsLabel">
                  Show Less
                </div>
              </div>
            </button>
          )}
          {filteredSet.length <= 0 && (
            <div className="EnumFacetFilter__noMatch">No match found</div>
          )}
        </div>
      </div>
    </div>
  )
}