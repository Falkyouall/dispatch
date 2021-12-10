import {theme} from "./App";
import {Chart} from "react-google-charts";

export default function Watcher(props) {
  const loads = props.loads || [];
  const max = 100;
  const data = loads.map((load, i) => [`Order-${i+1}`, load, max-load]);
  data.unshift([
    "Name",
    "Occupied",
    "Left Capacity"
  ])
  return (
      <Chart
          graphID={props.id}
          key={props.id}
          chartType="ColumnChart"
          explorer={{
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
          }}
          data={data}
          options={{
            title: '',
            legend: { position: 'bottom', textStyle: { fontSize: 12 } },
            backgroundColor: 'transparent',
            isStacked: true,
            colors: [
              theme.palette.warning.main, //  occupied capacity
              theme.palette.success.main
            ],
            chartArea: {left:0,top:0,width:'100%',height:'80%'},
            viewWindow: {
              min: [7, 30, 0],
              max: [17, 30, 0]
            },
            ticks: [
              { v: 1, f: 'Quant' },
              { v: 2, f: 'Verbal' },
              { v: 3, f: 'Total' },
            ],
          }}
          graph_id="Loads"
          width="100%"
          height="100%"
      />
  )
}