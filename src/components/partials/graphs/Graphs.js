import React, { useState, useEffect }  from 'react';
import { Button, Row, Col} from 'antd';
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries,makeWidthFlexible, RadialChart} from 'react-vis';

function Graphs(props) {
  const data = props.data;
  const [counter, setCounter] = useState(0);
  const [numberOfMales, setNumberOfMales] = useState(0);
  const [numberOfFemales, setNumberOfFemales] = useState(0);
  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  const FlexibleRadialChart = makeWidthFlexible(RadialChart);
  const pieData = [{angle: numberOfMales, radius: 30,label: "Male",subLabel: numberOfMales}, {angle: numberOfFemales, radius: 30,label: "Female",subLabel: numberOfFemales},];
  const colors = ["#CD3D91", "#1C78DC"];

  useEffect(() => {
    let males = 0;
    let females = 0;

    data.map(userObj=>{
      if(userObj.gender === 'male'){
        males += 1;
      } else if(userObj.gender === 'female') {
        females +=1;
      }
    });
    setNumberOfMales(males);
    setNumberOfFemales(females);
  });

  return (
    <div>
      <h1>Statistics</h1>
      <Row>
        <Col className="graph__container" xs={24} sm={24} md={12} lg={12} xl={12}>
          <span className="dot blue-background-color"></span>
          <span className="graph-title blue-color">Males</span>
          <span className="dot pink-background-color"></span>
          <span className="graph-title pink-color">Females</span>
          <FlexibleXYPlot margin={{bottom: 70}} xType="ordinal" height={350}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis tickLabelAngle={0} />
            <YAxis />
            <VerticalBarSeries
              color="#1C78DC"
              data={[
                {x: 'Males', y: numberOfMales}
              ]}
            />
            <VerticalBarSeries
              color="#CD3D91"
              data={[
                {x: 'Females', y: numberOfFemales},
              ]}
            />
          </FlexibleXYPlot><br></br>
        </Col>
        <Col className="graph__container" xs={24} sm={24} md={12} lg={12} xl={12}>
          <FlexibleRadialChart
            colorRange={colors}
            stroke={'#ffffff'}
            data={pieData} 
            height={350} 
            showLabels={true}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Graphs;