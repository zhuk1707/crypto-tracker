import {useRef, useState} from "react";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber, Result,
  Select,
  Space, Tag,
  Typography
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useCrypto} from "../context/crypto-context.jsx";
import TokenInfo from "./TokenInfo.jsx";

const selectIconStyle = {
  height: '24px',
  width: '24px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: '2px',
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} isn\'t valid number',
  },
  number: {
    range: '${label} must be from ${min} to ${max}'
  },
}


export const AddAssetForm = ({closeDrawer}) => {
  const {crypto, addAsset} = useCrypto()
  const [token, setToken] = useState(null);
  const [form, setForm] = Form.useForm();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const assetRef = useRef({id: '', amount: '', price: '', date: '',});

  if (!token) {
    return (
      <Select
        onSelect={(value) => {
          setToken(crypto.find((token) => token.id === value))
        }}
        style={{width: '100%',}}
        placeholder="Select a token"
        options={crypto.map(token => ({
          label: token.name,
          value: token.id,
          icon: token.icon,
        }))}
        optionRender={(option) => (
          <Space style={{display: "flex", alignItems: 'center'}}>
            <img src={option.data.icon} style={selectIconStyle} alt={option.data.lable}/>
            <span>{option.data.label}</span>
          </Space>
        )}
      />)
  }

  if (isFormSubmitted) {
    return (
      <Result
        status="success"
        title="New asset added successfully!"
        subTitle={`Added ${assetRef.current.amount} of ${token.name} [${token.symbol}] by price ${assetRef.current.price}$`}
        extra={[
          <Button type="primary" key="close" onClick={closeDrawer}>
            Perfect!
          </Button>,

        ]}
      />
    )
  }

  const onFinish = (values) => {
    const newAsset = {
      id: token.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    console.log(newAsset)
    assetRef.current = newAsset
    setIsFormSubmitted(true)
    addAsset(newAsset)
  };

  function handleAmountChange(value) {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    })
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(value * amount).toFixed(2),
    })
  }

  return (
    <>
      <TokenInfo token={token}/>

      <Divider/>

      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
        style={{
          maxWidth: '100%',
        }}
        initialValues={{
          price: token.price
        }}
        onFinish={onFinish}
        autoComplete="off"
        validateMessages={validateMessages}
      >
        <Form.Item
          label="Amount" name="amount"
          rules={[{
            required: true,
            type: 'number',
            min: 0,
          },
          ]}
        >
          <InputNumber
            placeholder="Your amount of coin"
            onChange={handleAmountChange}
            style={{width: '100%'}}
          />
        </Form.Item>

        <Form.Item
          label="Price" name="price"
          rules={[{
            required: true,
            type: 'number',
            min: 0,
          },
          ]}
        >
          <InputNumber
            onChange={handlePriceChange}
            style={{width: '100%'}}
          />
        </Form.Item>

        <Form.Item label="Date & Time" name="date">
          <DatePicker showTime style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item label="Total" name="total">
          <InputNumber disabled style={{width: '100%'}}/>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 0,
            span: 25,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{width: '100%'}}
          >
            <PlusOutlined/> Add Asset
          </Button>

        </Form.Item>
      </Form>

    </>
  )
}
