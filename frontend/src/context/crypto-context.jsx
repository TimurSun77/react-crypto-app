import {createContext, useState, useEffect, useContext} from 'react'
import { fakeFetchCripto, fetchAssets } from '../api';
import { percentDifference } from '../utils'
//инициализация контекста
const CryptoContext = createContext({
    assets: [], // создаем пустой масив со значениями по умолчанию
    crypto: [],
    loading: false,

}) 
//создаем функцию контекст провайдера котораф принемает в себя children
// eslint-disable-next-line react/prop-types
export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([]) // по умолчанию равны пустому масиву
    const [assets, setAssets] = useState([]) // по умолчанию равны пустому масиву

    function mapAssets(assets, result) {
        return assets.map(asset=>{
            const coin = result.find(c => c.id === asset.id)
            return {
                grow: asset.price < coin.price, // booleam
                growPercent: percentDifference(asset.price, coin.price),
                totalAmount: asset.amount * coin.price,
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,
                name: coin.name,
                ...asset
            }   
        })
    }

    useEffect(()=> {
        // console.log ('useEffect')
        async function preload(){
            setLoading(true) //  пока работает функция вызова мыв выставляем состояни loading
            const {result} = await fakeFetchCripto() // смотри данные data.js мы сразу обращаемся в массив result
            const assets = await fetchAssets()
            // console.log ('assets from fetch: ', assets)
            setAssets(mapAssets(assets, result))
            setCrypto(result)
            setLoading(false)
        }
        preload()
    }, [])

    function addAsset (newAsset){
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }
    return (
        <CryptoContext.Provider value = {{loading, crypto, assets, addAsset}}>
            { children }
        </CryptoContext.Provider>
    )
}
export default CryptoContext

export function useCrypto () {
    return useContext(CryptoContext)
}