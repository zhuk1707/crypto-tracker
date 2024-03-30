import {createContext, useContext, useEffect, useState} from "react";
import {fakeFetchCryptoData, fetchCryptoAssets} from "../api.js";
import {capitalize, getPercentDifference} from "../utils.js";

const CryptoContext = createContext({
  assets:[],
  crypto:[],
  loading:false,
})

export function CryptoContextProvider({children}) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);
  
  const mapAssets = (assets, result) => {
    return assets.map(asset => {
      const token = result.find(t => t.id === asset.id)
      return {
        symbol: token.symbol,
        grow: asset.price < token.price,
        growPercent: getPercentDifference(token.price, asset.price),
        totalAmount: asset.amount * token.price,
        totalProfit: asset.amount * token.price - asset.amount * asset.price,
        name: capitalize(token.name),
        ...asset
      }
    })
  }

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const assets = await fetchCryptoAssets()
      const {result} = await fakeFetchCryptoData()

      setAssets(mapAssets(assets, result))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  const addAsset = (newAsset) => {
    setAssets((prevState) => mapAssets([...prevState, newAsset], crypto))
  }

  return <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>{children}</CryptoContext.Provider>
}

export default CryptoContext

export function useCrypto() {
  return useContext(CryptoContext)
}