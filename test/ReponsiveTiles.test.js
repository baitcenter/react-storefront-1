import React from 'react'
import { mount } from 'enzyme'
import { createMuiTheme } from '@material-ui/core/styles'
import { GridListTile } from '@material-ui/core'
import ResponsiveTiles from 'react-storefront/ResponsiveTiles'
import AutoScrollToNewChildren from 'react-storefront/AutoScrollToNewChildren'

describe('ResponsiveTiles', () => {
  let wrapper

  afterEach(() => {
    wrapper.unmount()
  })
  it('should render component', () => {
    wrapper = mount(<ResponsiveTiles />)

    expect(wrapper.find(ResponsiveTiles).exists()).toBe(true)
  })

  it('should wrap have when autoscroll prop is true', () => {
    wrapper = mount(
      <ResponsiveTiles>
        <div>Test</div>
      </ResponsiveTiles>,
    )

    expect(wrapper.find(AutoScrollToNewChildren).exists()).toBe(false)

    wrapper = mount(
      <ResponsiveTiles autoScrollToNewTiles>
        <div>Test</div>
      </ResponsiveTiles>,
    )

    expect(wrapper.find(AutoScrollToNewChildren).exists()).toBe(true)
  })

  it('should skip invalid elements', () => {
    wrapper = mount(
      <ResponsiveTiles>
        <div>Test1</div>
        <div>Test2</div>
        Test
      </ResponsiveTiles>,
    )

    expect(wrapper.find(GridListTile).length).toBe(2)
  })

  it('should be able to pass custom spacing', () => {
    const theme = createMuiTheme()
    const spacing = 2
    const root = document.createElement('div')
    document.body.appendChild(root)

    wrapper = mount(
      <ResponsiveTiles spacing={spacing}>
        <div id="test">Test1</div>
        <div>Test2</div>
      </ResponsiveTiles>,
      { attachTo: root },
    )

    expect(window.getComputedStyle(document.querySelector('ul')).margin).toBe(
      `-${theme.spacing(spacing)}px`,
    )
    expect(window.getComputedStyle(document.querySelector('li')).padding).toBe(
      `${theme.spacing(spacing)}px`,
    )
  })

  it.todo('should be able to pass custom column breakpoints')
})
