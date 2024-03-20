import {Divider, Flex, Tag, Typography} from "antd"

export const TokenInfo = ({token}) => {
  const iconStyle = {
    height: '40px',
    width: '40px',
    marginRight: '10px',
  }

  const titleStyle = {
    marginRight: "8px"
  }

  return (
    <>
      <Flex align='center'>
        <img
          style={iconStyle}
          src={token.icon}
          alt={token.id}
        />
        <Typography.Title
          level={2}
          style={{marginBottom: 0}}
        >
          {token.name} <span style={{opacity: 0.5}}>{token.symbol}</span>
        </Typography.Title>
      </Flex>

      <Divider/>

      <Typography.Paragraph strong>
        <Typography.Text style={titleStyle}>Price</Typography.Text>
        <Tag color={(token.priceChange1h > 0) ? "success" : 'error'}>{token.price.toFixed(2)}$</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={titleStyle}>1 hour</Typography.Text>
        <Tag color={(token.priceChange1h > 0) ? "success" : 'error'}>{token.priceChange1h}%</Tag>
        <Typography.Text style={titleStyle}>1 day</Typography.Text>
        <Tag color={(token.priceChange1d > 0) ? "success" : 'error'}> {token.priceChange1d}%</Tag>
        <Typography.Text style={titleStyle}>1 week</Typography.Text>
        <Tag color={(token.priceChange1w > 0) ? "success" : 'error'}> {token.priceChange1w}%</Tag>
      </Typography.Paragraph>

      <Divider/>

      <Typography.Paragraph>
        <Typography.Text style={titleStyle}>Price BTC</Typography.Text>
        <Tag>{token.priceBtc} BTC</Tag>
      </Typography.Paragraph>

      <Typography.Paragraph>
        <Typography.Text style={titleStyle}>Market Cap</Typography.Text>
        <Tag>{token.marketCap}$</Tag>
      </Typography.Paragraph>

      {token.contractAddress &&
        <Typography.Paragraph>
          <Typography.Text style={titleStyle}>Contract Address</Typography.Text>
          <Tag>{token.contractAddress}</Tag>
          <Typography.Text copyable={{text: token.contractAddress}}/>
        </Typography.Paragraph>
      }

    </>
  )
}