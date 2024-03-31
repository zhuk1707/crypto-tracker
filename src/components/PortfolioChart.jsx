import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useCrypto} from "../context/crypto-context.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PortfolioChart() {
  const {assets} = useCrypto()

  const data = {
    labels: assets.map(value => value.name),
    datasets: [
      {
        label: 'USD',
        data: assets.map(value => value.totalAmount),
        backgroundColor: [
          'rgb(255,87,34)',
          'rgb(255,152,0)',
          'rgb(255,193,7)',
          'rgb(255,235,59)',
          'rgb(205,220,57)',
          'rgb(139,195,74)',
          'rgb(76,175,80)',
          'rgb(0,150,136)',
          'rgb(0,188,212)',
          'rgb(3,169,244)',
          'rgb(33,150,243)',
          'rgb(63,81,181)',
          'rgb(103,58,183)',
          'rgb(156,39,176)',
          'rgb(232,30,99)',
          'rgb(244,67,54)',

        ],
        borderColor: [
          'rgb(255,87,34)',
          'rgb(255,152,0)',
          'rgb(255,193,7)',
          'rgb(255,235,59)',
          'rgb(205,220,57)',
          'rgb(139,195,74)',
          'rgb(76,175,80)',
          'rgb(0,150,136)',
          'rgb(0,188,212)',
          'rgb(3,169,244)',
          'rgb(33,150,243)',
          'rgb(63,81,181)',
          'rgb(103,58,183)',
          'rgb(156,39,176)',
          'rgb(232,30,99)',
          'rgb(244,67,54)',
        ],
        borderWidth: 1,
      },
    ],
  };


  return <div style={{
    display: 'flex',
    maxHeight: 400,
    justifyContent: "center",
    alignItems: "center"

  }}>
    <Doughnut data={data}/>
  </div>
}