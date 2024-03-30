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
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
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