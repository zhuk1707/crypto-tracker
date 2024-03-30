import {Divider, Flex, Tag, Typography} from "antd"
import TokenInfo from "./TokenInfo.jsx";

export const TokenInfoModal = ({token}) => {
  const titleStyle = {
    marginRight: "8px"
  }

  return (
    <>
      <TokenInfo token={token}/>

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