import {Layout, Card, Statistic, List, Typography, Tag} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from '@ant-design/icons';
import {capitalize} from "../../utils.js";
import {useContext} from "react";
import CryptoContext from "../../context/crypto-context.jsx";

const siderStyle = {
  backgroundColor: '#dadada',
  padding: '1rem',
};

const cardStyle = {
  marginBottom: "1rem"
}

export default function AppSider() {
  const {assets} = useContext(CryptoContext)

  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {assets.map(asset => (
        <Card
          key={asset.id}
          bordered={false}
          style={cardStyle}
        >
          <Statistic
            title={`${capitalize(asset.id)} ${asset.symbol}`}
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
                    <Tag color={asset.grow ? 'success' : 'error'}>
                      {asset.growPercent}%
                    </Tag>
                  }

                  {item.isPlain && item.value}

                  {!item.isPlain &&
                    <Typography.Text type={asset.grow ? 'success' : 'error'}>
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
