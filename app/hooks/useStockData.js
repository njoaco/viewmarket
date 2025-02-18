import { useState, useEffect } from 'react';
import axios from 'axios';
import { calculateRSI, calculateMACD, calculateBollingerBands, calculateEMA } from '../backend/references/indicators';

const useStockData = (stock, timePeriod) => {
  const [data, setData] = useState({
    price: null,
    priceChange24h: null,
    priceChangeAbs24h: null,
    chartData: [],
    error: null,
    rsiValue: null,
    macdValue: null,
    bollingerBands: null,
    emaValue: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/backend/api/stocks', { stock });

        if (!response.data) {
          throw new Error('Datos insuficientes de la API');
        }

        const { price, priceChange24h, priceChangeAbs24h, chartData } = response.data;

        const indicators = {
          rsi: calculateRSI(chartData),
          macd: calculateMACD(chartData),
          bb: calculateBollingerBands(chartData),
          ema: calculateEMA(chartData, 20),
        };

        setData({
          price,
          priceChange24h,
          priceChangeAbs24h,
          chartData,
          error: null,
          rsiValue: indicators.rsi.slice(-1)[0],
          macdValue: indicators.macd.macd.slice(-1)[0],
          bollingerBands: indicators.bb,
          emaValue: indicators.ema.slice(-1)[0],
        });

      } catch (error) {
        setData(prev => ({ ...prev, error: error.message }));
      }
    };

    if (stock) fetchData();
  }, [stock, timePeriod]);

  return data;
};

export default useStockData;