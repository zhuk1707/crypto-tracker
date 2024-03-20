export const TokenInfo = ({token}) => {
  const headerStyle = {
    display: 'flex',
    alignItems: "center",
  }

  const iconStyle = {
    height: '26px',
    width: '26px',
    marginRight: '6px',
  }

  return (
    <div style={headerStyle}>
      <img
        style={iconStyle}
        src={token.icon}
        alt={token.id}
      />
      <h2>{token.name}</h2>
      <h2
        style={{opacity: '.5', marginLeft: '16px', fontWeight: 500}}
      >{token.symbol}</h2>
    </div>
  )
}