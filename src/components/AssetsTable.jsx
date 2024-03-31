import {Table} from 'antd';
import {useCrypto} from "../context/crypto-context.jsx";

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    defaultSortOrder: 'descend',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a, b) => a.amount - b.amount,
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Grow, %',
    dataIndex: 'growPercent',
    sorter: (a, b) => a.growPercent - b.growPercent,
  },
  {
    title: 'Portfolio, $',
    dataIndex: 'totalAmount',
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: 'Profit, $',
    dataIndex: 'totalProfit',
    sorter: (a, b) => a.totalProfit - b.totalProfit,
  },
];


export default function AssetsTable() {
  const {assets} = useCrypto()

  const data = assets.map(a => ({
    key: a.id,
    name: a.name + ' ' + a.symbol,
    price: a.price,
    amount: a.amount,
    growPercent: a.growPercent,
    totalAmount: +a.totalAmount.toFixed(2),
    totalProfit: +a.totalProfit.toFixed(2),
  }))

  return (<Table
    pagination={false}
    columns={columns}
    dataSource={data}
  />)
}
