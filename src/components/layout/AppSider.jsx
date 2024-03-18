import {useEffect, useState} from "react";
import {Layout, Card, Statistic, List, Spin, Typography, Tag} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {fakeFetchCryptoData, fetchCryptoAssets} from "../../api.js";
import {capitalize, getPercentDifference} from "../../utils.js";

const siderStyle = {
  backgroundColor: '#dadada',
  padding: '1rem',
};

const cardStyle = {
  borderColor: 'none',
  marginBottom: "1rem"
}

export default function AppSider() {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const assets = await fetchCryptoAssets()
      const {result} = await fakeFetchCryptoData()

      setAssets(assets.map((asset) => {
        const token = result.find(t => t.id === asset.id)
        return {
          grow: asset.price < token.price,
          growPercent: getPercentDifference(token.price, asset.price),
          totalAmount: asset.amount * token.price,
          totalProfit: asset.amount * token.price - asset.amount * asset.price,
          ...asset
        }
      }))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  if (loading) return <Spin fullscreen/>

  return (
    <Layout.Sider width="25%" style={siderStyle}>

      {assets.map(asset => (
        <Card
          key={asset.id}
          bordered={false}
          style={cardStyle}
        >
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount.toFixed(2)}
            valueStyle={{
              color: asset.grow ? '#52c41a' : '#ff4d4f',
            }}
            prefix={asset.grow ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
            suffix="$"
          />
          <List
            size='small'
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit, withTag: true},
              {title: 'Asset Amount', value: asset.amount, isPlain: true},
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag &&
                    <Tag color={asset.grow ? 'green' : 'red'}>
                      {asset.growPercent}%
                    </Tag>
                  }

                  {item.isPlain && item.value}

                  {!item.isPlain &&
                    <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                      {item.value.toFixed(2)}$
                    </Typography.Text>
                  }
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}

    </Layout.Sider>
  )
};
