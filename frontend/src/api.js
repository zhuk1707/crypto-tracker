import {cryptoData, cryptoAssets} from "./data.js";

//request emulation
export function fakeFetchCryptoData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoData)
    }, 1000)
  })
}

export function fetchCryptoAssets() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(cryptoAssets)
    }, 1000)
  })
}