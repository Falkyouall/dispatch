import {theme} from "./App";
import {Chart} from "react-google-charts";

export default function Watcher(props) {
  const loads = props.loads || [];
  const max = Math.max(...loads);
  const data = loads.map((load, i) => [`Load-${i}`, load, max-load]);

  data.unshift([
    "Name",
    "Belegte Kapazität in kg",
    "Lieferung in kg",
  ])
  return (
      <Chart
          graphID={props.id}
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
            ticks: [
              { v: 1, f: 'Quant' },
              { v: 2, f: 'Verbal' },
              { v: 3, f: 'Total' },
            ],
          }}
          graph_id="Loads"
          width="100%"
          height="450px"
      />
  )
}