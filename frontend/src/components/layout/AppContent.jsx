import { Layout, Typography } from 'antd';
import { useCrypto} from '../../context/crypto-context'
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};
export default function AppContent() {
    const { assets, crypto} = useCrypto()
    //создаем карту - это массив со сзначениями типа параметр и значение  'bitcoin' : 123421
    //используем метод любого массива reduce (() = > {}, {}) - в этом методе для каждого значения массива выполняется какое либо действие и передается в какоюто переменную
    //в случае ниже мы сосздаем переменную "acc" и каждое значение "с". Далее мы проводим действие/ создаем масив "acc" со значением "c.id" равным "c.price"
    //т,е, массив с id крипты и ее ценой - "avalanche-2: 34.14"
    const cryptoPriceMap = crypto.reduce((acc, c)=> {
        acc[c.id] = c.price
        // console.log ('acc:', acc)
        return acc
    }, {})

    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level = {3} style={{ textAlign: 'left', color: '#fff'}}>
                Portfolio: {assets
                    .map(asset=>asset.amount * cryptoPriceMap[asset.id]) // тут мы передаем в карту значение ID для каждого ассета и получаем его цену из краты умножая на кол-во этого ассета полуаем стоимость ассета
                    .reduce((acc, v)=> acc += v, 0 ) // испольщуем метод массива reduce для суммировнаия стоимости всех ассетов 
                    .toFixed(2)} 
                $
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    )
}
