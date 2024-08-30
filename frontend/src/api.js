import { cryptoAssets, cryptoData} from './data'

export function fakeFetchCripto () {
    return new Promise((resolve) =>{
        setTimeout(()=> {
            resolve(cryptoData)
        }, 1)
    })
}

export function fetchAssets () {
    // console.log ('fetcingAsset fucntion')
    return new Promise((resolve) =>{
        setTimeout(()=> {
            resolve(cryptoAssets)
        }, 1)
    })
}