import { Layout, Select, Space, Button, Modal, Drawer} from 'antd';
import {useCrypto} from '../../context/crypto-context'
import { useEffect, useState } from 'react';
import CoinInfoModel from '../CoinInfoModel'
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // background: '#fff'

    };

export default function AppHeader() {
  const [select, setSelect] = useState(false) //создаем флаг для ручного управление состоянием компонента select (открыт или закрыт) для реализации програмного открытия при нажатии на клавишу 
  const [modal, setModal] = useState(false) // флаг состояния модального окна (открывается при выборе из спсика криптовалюты)
  const [coin, setCoin] = useState (null) // выставляем выбранную крипту
  const [drawer, setDrawer] = useState (false) //флаг открытости drawer
  const {crypto } = useCrypto() // вызываем вункция useCrypto кастомный хук, чтобы получить контекстные данные

  //создадим useEffect - стандартная структура -  useEffect(()=> {}, [])
  useEffect(()=> {
    const keypress = event => { // эта функция вызывается методом addEventListener 
      if (event.key == '/'){ // если нажатая кнопкак это слэш '/'
        setSelect((prev)=> !prev) //выставляем значение флага select в противоположное значение? что позволит также слэшем и закрывать
      }
    }
    document.addEventListener('keypress', keypress) // создаем listener который будет следить за событием нажата конопка 'keypress' и выполнять функцию keypress которую мы тутже и определили
    return ()=> document.removeEventListener ('keypress', keypress) //в случае если компонент уничтожается, мы должны убрать listener
  }, [])
  function handleSelect ( value ){ // value - это ID той крипты которую мы выбираем вытаскивае его в методе options компонента select
    console.log ('value: ', value)
    setModal(true)
    setCoin(crypto.find((c)=> c.id === value))
  }
    return (
    <Layout.Header style={headerStyle}>
    <Select 
      style={{
        width: 250,
      }}
      open = {select}
      value = "rpess / to open"
      onSelect={handleSelect}
      onClick = {()=> setSelect((prev)=> !prev)} //выставляем занчение select в противоположное значение
      options={crypto.map(coin=>({
        label: coin.name,
        value: coin.id,
        icon: coin.icon,
      }))}
      optionRender={(option) => (
      <Space>
        <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label}/> {option.data.label}
      </Space>
    )}
    />
    <Button type="primary" onClick={()=> setDrawer(true)} >Add asset</Button>
    <Modal  
      open={modal} 
      onOk={()=> setModal(false)} 
      onCancel={()=> setModal(false)}
      footer={null}
    >
        <CoinInfoModel coin = {coin} />
      </Modal>
      <Drawer 
        destroyOnClose
        width={600}
        title="Add Asset or Transaction" 
        onClose={()=> setDrawer(false)} 
        open={drawer}>
        <AddAssetForm onClose = {() => setDrawer(false)} />
      </Drawer>
    </Layout.Header>
    )
}
