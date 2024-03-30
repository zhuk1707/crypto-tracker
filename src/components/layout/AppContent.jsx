import {Card, Layout, Typography} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import PortfolioChart from "./../PortfolioChart.jsx"
import AssetsTable from "./../AssetsTable.jsx"

const contentStyle = {
  textAlign: 'center',
  minHeight: 'calc(100vh - 60px)',
  backgroundColor: '#dadada',
  padding: '1rem'
};

export default function AppContent() {
  const {assets, crypto} = useCrypto()

  const cryptoPriceMap = crypto.reduce((previousValue, currentValue) => {
    previousValue[currentValue.id] = currentValue.price
    return previousValue
  }, {})

  return (
    <Layout.Content style={contentStyle}>
      <Card bordered={false} style={{marginBottom:'1em'}}>
        <Typography.Title level={3} style={{textAlign: 'left', marginBottom:'0'}}>
          Portfolio: {assets
          .map(asset => asset.amount * cryptoPriceMap[asset.id])
          .reduce((previousValue, currentValue) => previousValue + currentValue, 0)
          .toFixed(2)
        }$
        </Typography.Title>
      </Card>

      <Card bordered={false} style={{marginBottom:'1em'}}>
        <PortfolioChart></PortfolioChart>
      </Card>

      <Card bordered={false} style={{marginBottom:'1em'}}>
        <AssetsTable></AssetsTable>
      </Card>
    </Layout.Content>
  )
};