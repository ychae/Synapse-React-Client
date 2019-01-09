import * as React from 'react'
import { shallow } from 'enzyme'
import { Facets, CheckboxGroup } from '../../../lib/containers/Facets'
import { mockData } from '../../../mocks'

describe('it renders a facet without crashing', () => {
  it('renders correctly', async () => {
    const tree = await shallow(
        <Facets
            data={mockData}
            filter={'name'}
        />
    )
    expect(tree).toBeDefined()
  })

  it('renders checkbox groups correctly', async () => {
    const tree = await shallow(
        <Facets
            data={mockData}
            filter={'name'}
        />
    )
    expect(tree).toBeDefined()
    expect(tree.find(CheckboxGroup)).toHaveLength(1)
  })
})