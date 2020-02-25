import * as React from 'react'
import { Checkbox } from '../../../lib/containers/widgets/Checkbox'
import { RadioGroup } from '../../../lib/containers/widgets/RadioGroup'
import DotPlot from '../../../lib/containers/widgets/themes-plot/ThemesPlot'
import { Range, RangeValues } from '../../../lib/containers/widgets/Range'
import { RangeSlider } from '../../../lib/containers/widgets/RangeSlider'
import { useState } from 'react'

type WigetDemoPros = {
  token: string
}

export const WidgetDemo: React.FunctionComponent<WigetDemoPros> = (props: WigetDemoPros) => {
  const options = [
    { label: 'option 1', value: 'option1' },
    { label: 'option 2', value: 'option2' },
    { label: 'option 3', value: 'option3' },
  ]
  const [check1, setCheck1] = useState(true)
  const [check2, setCheck2] = useState(false)
  const [optionValue, setOptionValue] = useState('option2')
  const [rangeNumberValue, setRangeNumberValue] = useState(() => {
    const result: RangeValues = {
      min: '10.5',
      max: '30',
    }
    return result
  })
  const [rangeDateValue, setRangeDateValue] = useState(() => {
    const result: RangeValues = {
      min: new Date(2019, 5, 10).toISOString(),
      max: new Date(2019, 6, 11).toISOString(),
    }
    return result
  })

  const [rangeSliderValue, setRangeSliderValue] = useState({
    min: '10',
    max: '25',
  })

  const topBarPlotProps = {
    entityId: 'syn21641485',
    xField: 'totalCount',
    yField: 'groupBy',
    groupField: 'consortium',
  }
  const sideBarPlotProps = {
    entityId: 'syn21649281',
    xField: 'projects',
    yField: 'theme',
    groupField: 'consortium',
  }

  const dotPlotProps ={
    entityId: 'syn21639584',
    xField: 'totalCount',
    yField: 'theme',
    groupField: 'groupBy',
    whereClause: 'groupBy IN (\'publications\', \'tools\', \'datasets\')'
  }

  return (
    <div className="container">
      <div style={{ fontWeight: 'bold' }}></div>
      <h4 style={{ marginTop: '20px' }}>Checkbox</h4>
      Checkbox 1 is {check1 ? 'checked' : 'unchecked'}
      <br />
      Checkbox 2 is {check2 ? 'checked' : 'unchecked'}
      <br />
      <Checkbox
        label="Initially Checked Checkbox"
        id="ch1"
        checked={true}
        onChange={(checked: boolean) => setCheck1(checked)}
      ></Checkbox>
      <Checkbox
        label="Initially Unchecked Checkbox"
        id="ch2"
        onChange={(checked: boolean) => setCheck2(checked)}
      ></Checkbox>
      <hr></hr>
      <h4 style={{ marginTop: '20px' }}>Radio</h4>
      Option Value is: {optionValue}
      <br />
      <RadioGroup
        id="radioGroup1"
        options={options}
        value={optionValue}
        onChange={(value: string) => setOptionValue(value)}
      ></RadioGroup>
      <hr></hr>
      <h4 style={{ marginTop: '20px' }}>Number Range</h4>
      Number Range Value is:
      {` ${rangeNumberValue.min} - ${rangeNumberValue.max}`}
      <br />
      <Range
        type="number"
        initialValues={{ min: rangeNumberValue.min, max: rangeNumberValue.max }}
        onChange={(values: RangeValues) => setRangeNumberValue(values)}
      ></Range>
      <hr></hr>
      <h4>Date Range</h4>
      Number Date Value is: {rangeDateValue.min} - {rangeDateValue.max}
      <br />
      <Range
        type="date"
        initialValues={{ min: rangeDateValue.min, max: rangeDateValue.max }}
        onChange={(values: RangeValues) => setRangeDateValue(values)}
      ></Range>
      <hr></hr>
      <h4>Range Slider</h4>
      Range Slider Value is: {rangeSliderValue.min} - {rangeSliderValue.max}
      <br />
      <RangeSlider
        initialValues={rangeSliderValue}
        onChange={(values: { min: string; max: string }) =>
          setRangeSliderValue(values)
        }
        domain={['0', '100']}
        step={1}
      ></RangeSlider>
      <DotPlot token={props.token}  topBarPlot={topBarPlotProps} sideBarPlot={sideBarPlotProps} dotPlot={dotPlotProps} ></DotPlot>
    </div>
  )
}
