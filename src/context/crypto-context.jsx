import {createContext, useEffect, useState} from "react";
import {fakeFetchCryptoData, fetchCryptoAssets} from "../api.js";
import {getPercentDifference} from "../utils.js";

const CryptoContext = createContext({
  assets:[],
  crypto:[],
  loading:false,
})

export function CryptoContextProvider({children}) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function preload() {
      setLoading(true)
      const assets = await fetchCryptoAssets()
      const {result} = await fakeFetchCryptoData()

      setAssets(assets.map((asset) => {
        const token = result.find(t => t.id === asset.id)
        return {
          grow: asset.price < token.price,
          growPercent: getPercentDifference(token.price, asset.price),
          totalAmount: asset.amount * token.price,
          totalProfit: asset.amount * token.price - asset.amount * asset.price,
          ...asset
        }
      }))
      setCrypto(result)
      setLoading(false)
    }

    preload()
  }, [])

  return <CryptoContext.Provider value={{loading, crypto, assets}}>{children}</CryptoContext.Provider>
}

export default CryptoContext