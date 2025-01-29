'use client';
import { useState, useRef, useEffect } from 'react'; // Aseguramos que useRef esté importado
import Login from './components/Login/login';
import useCryptoData from './hooks/useCryptoData';
import useChartHeight from './hooks/useChartHeight';
import usePricePrediction from './hooks/usePricePrediction';
import ChartComponent from './components/ChartComponent';
import CryptoInput from './components/CryptoInput';
import PriceDisplay from './components/PriceDisplay';
import Indicators from './components/Indicators';
import TimePeriodInput from './components/TimePeriodInput';
import SocialIcons from './components/SocialIcons';
import styles from './page.module.css';

function Home() {
  const [crypto, setCrypto] = useState('BTC');
  const [timePeriod, setTimePeriod] = useState(30);
  const chartContainerRef = useRef(null); // Necesario para calcular el alto del gráfico

  const chartHeight = useChartHeight(chartContainerRef);
  const { price, chartData, error, rsiValue, macdValue, bollingerBands } = useCryptoData(crypto, timePeriod);
  const { prediction, predictionStyle } = usePricePrediction(chartData, timePeriod);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <CryptoInput crypto={crypto} setCrypto={setCrypto} />
        <PriceDisplay 
          price={price} 
          chartData={chartData} 
          prediction={prediction} 
          predictionStyle={predictionStyle} 
        />
      </div>

      <TimePeriodInput timePeriod={timePeriod} setTimePeriod={setTimePeriod} />

      <Indicators 
        rsiValue={rsiValue} 
        macdValue={macdValue} 
        bollingerBands={bollingerBands} 
      />

      <div ref={chartContainerRef} className="chart w-full" style={{ height: chartHeight }}>
        {error && <p className="text-red-500">We couldn't load the '{crypto}' token </p>}
        {chartData.length > 0 && (
          <ChartComponent
            crypto={crypto}
            chartData={chartData}
            rsiValue={rsiValue}
            macdValue={macdValue}
            bollingerBands={bollingerBands}
          />
        )}
      </div>

      <SocialIcons />
    </div>
  );
}

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('logged-in', isLoggedIn);
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  return <Home />;
}
