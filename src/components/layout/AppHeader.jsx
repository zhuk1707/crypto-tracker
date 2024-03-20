import {Button, Drawer, Layout, Modal} from "antd";
import {Select, Space} from 'antd';
import {useCrypto} from "../../context/crypto-context.jsx";
import {useEffect, useRef, useState} from "react";
import {TokenInfo} from "../TokenInfo.jsx";
import {AddAssetForm} from "../AddAssetForm.jsx";

const headerStyle = {
  height: 60,
  backgroundColor: "#fafafa",
  borderBottom: '1px solid #eee',
  padding: '1em',
  display: 'flex',
  justifyContent: 'space-between'
};

const iconStyle = {
  height: '20px',
  width: '20px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: '2px',
}

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [token, setToken] = useState();

  const selectRef = useRef(null);

  const setFocusOnSelect = () => selectRef.current.focus();
  const setBlurOnSelect = () => selectRef.current.blur();

  useEffect(() => {
    const keypress = (event) => {
      if (event.key === `/`) {
        setSelect((prevState) => {
          (prevState)? setBlurOnSelect() : setFocusOnSelect()
          return !prevState
        })
      }
    };



    document.addEventListener("keypress", keypress)
    return () => {
      document.removeEventListener("keypress", keypress)
    }
  }, []);

  const {crypto} = useCrypto()

  function handleSelect(value) {
    setIsModalOpen(true)
    setToken(crypto.find((t) => t.id === value))
  }

  function handleCancel() {
    setIsModalOpen(false)
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        ref={selectRef}
        onSelect={handleSelect}
        onClick={() => setSelect((prevState) => {
          (prevState)? setBlurOnSelect() : setFocusOnSelect()
          return !prevState
        })}
        open={select}
        style={{width: 'calc(25% - 24px)',}}
        placeholder="select a token"
        options={crypto.map((token) => ({
          label: token.name,
          value: token.id,
          icon: token.icon,
        }))}
        optionRender={(option) => (
          <Space style={{display: "flex", alignItems: 'center'}}>
            <img src={option.data.icon} style={iconStyle} alt={option.data.lable}/>
            <span>{option.data.label}</span>
          </Space>
        )}
      />

      <Button
        type="default"
        onClick={() => {
          setIsDrawerOpen(true)
        }}
      >
        Add Asset
      </Button>

      <Modal
        footer={null}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <TokenInfo token={token}/>
      </Modal>

      <Drawer
        title="Add Asset"
        width='50%'
        onClose={() => {
          setIsDrawerOpen(false)
        }}
        open={isDrawerOpen}
      >
        <AddAssetForm/>
      </Drawer>
    </Layout.Header>
  )
};