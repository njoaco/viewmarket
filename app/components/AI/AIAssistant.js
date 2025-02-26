import { useState, useEffect, useCallback } from 'react';
import { FaRobot } from 'react-icons/fa';

const AIAssistant = ({ asset, mode, price, indicators, change24h }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Mode:", mode, "Asset:", asset);
  }, [mode, asset]);

  const assetType = mode;
  const assetLabel = asset && asset.trim() !== '' ? asset : 'Símbolo no disponible';

  const getAIAnalysis = useCallback(async (options = {}) => {
    setAnalysis('');
    setIsLoading(true);
    try {
      const response = await fetch('../../backend/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          asset: assetLabel, 
          mode, 
          price, 
          indicators, 
          change24h, 
          predictionMode: options.predictionMode || false,
          actionQuery: options.actionQuery || false,
          holdQuery: options.holdQuery || false
        })
      });

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const rawResponse = await response.text();
        console.error('Respuesta no JSON:', rawResponse);
        throw new Error('Formato de respuesta inválido');
      }

      const data = await response.json();
      setAnalysis(data.analysis?.replace(/la acción/gi, assetType) || `No se pudo generar un análisis para ${assetLabel}`);
    } catch (error) {
      console.error('Error completo:', error);
      setAnalysis(`Error: ${error.message}`);
    }
    setIsLoading(false);
  }, [assetLabel, mode, price, indicators, change24h, assetType]); // ✅ Agregado assetType

  useEffect(() => {
    if (isOpen) {
      getAIAnalysis();
    }
  }, [asset, mode, isOpen, getAIAnalysis]); // ✅ Dependencias corregidas

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 focus:outline-none"
      >
        <FaRobot />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-20 right-0 w-80 rounded-lg shadow-2xl p-4 border animate-slide-up-fade-in
                     max-h-[60vh] overflow-y-auto"
          style={{
            backgroundColor: 'var(--card-bg)',
            color: 'var(--card-text)',
            borderColor: 'var(--secondary)',
          }}
        >
          <h3 className="text-lg font-bold mb-4">
            {assetLabel} Analysis
          </h3>

          {isLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-4 rounded w-3/4" style={{ backgroundColor: 'var(--secondary)' }}>
                Generating...
              </div>
            </div>
          ) : (
            <div className="max-h-[50vh] overflow-y-auto">
              <p className="animate-fade-in text-sm" 
                 style={{ color: 'var(--card-text)' }}>
                {analysis}
              </p>
            </div>
          )}

          <div className="mt-3 space-y-2">
            <button 
              onClick={() => getAIAnalysis({ predictionMode: true })} 
              className="w-full bg-blue-600 text-white p-2 rounded-xl transition-transform transform hover:scale-105 hover:bg-blue-700"
            >
              What will the price be at the end of this month?
            </button>

            <button 
              onClick={() => getAIAnalysis({ actionQuery: true })} 
              className="w-full bg-blue-600 text-white p-2 rounded-xl transition-transform transform hover:scale-105 hover:bg-blue-700"
            >
              Do I buy or sell?
            </button>

            <button 
              onClick={() => getAIAnalysis({ holdQuery: true })} 
              className="w-full bg-blue-600 text-white p-2 rounded-xl transition-transform transform hover:scale-105 hover:bg-blue-700"
            >
              Do I hold?
            </button>
          </div>
          
          <div className="mt-4 text-xs" style={{ color: 'var(--secondary)' }}>
            * AI-generated analysis
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
