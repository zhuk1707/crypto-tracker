import {Flex, Typography} from "antd";

const infoIconStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: '40px',
  width: '40px',
  marginRight: '10px',
}

export default function TokenInfo({token}) {
  return (
    <Flex align='center'>
      <img
        style={infoIconStyle}
        src={token.icon}
        alt={token.id}
      />
      <Typography.Title
        level={2}
        style={{marginBottom: 0}}
      >
        {token.name} <span style={{opacity: 0.4}}>{token.symbol}</span>
      </Typography.Title>
    </Flex>
  )
}