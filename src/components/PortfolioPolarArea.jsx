import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {PolarArea} from 'react-chartjs-2';
import {useCrypto} from "../context/crypto-context.jsx";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PortfolioPolarArea() {
  const {assets} = useCrypto()

  const data = {
    labels: assets.map(value => value.name),
    datasets: [
      {
        label: 'Total Profit, %',
        data: assets.map(value => value.totalProfit),
        backgroundColor: [
          'rgb(255,87,34, 0.33)',
          'rgb(255,152,0, 0.33)',
          'rgb(255,193,7, 0.33)',
          'rgb(255,235,59, 0.33)',
          'rgb(205,220,57, 0.33)',
          'rgb(139,195,74, 0.33)',
          'rgb(76,175,80, 0.33)',
          'rgb(0,150,136, 0.33)',
          'rgb(0,188,212, 0.33)',
          'rgb(3,169,244, 0.33)',
          'rgb(33,150,243, 0.33)',
          'rgb(63,81,181, 0.33)',
          'rgb(103,58,183, 0.33)',
          'rgb(156,39,176, 0.33)',
          'rgb(232,30,99, 0.33)',
          'rgb(244,67,54, 0.33)',

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
    alignItems: "center",
  }}>
    <PolarArea data={data}/>
  </div>
}