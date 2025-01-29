![logo](https://github.com/user-attachments/assets/f76bd857-da40-4a5a-8995-c477647bb157)

Powered by **Next.js**

**ViewMarket** is a platform designed to explore the cryptocurrency market. It allows users to view current prices, historical charts, and future predictions based on advanced mathematical algorithms.

## Features
- **Search Functionality**: Search for cryptocurrencies by their symbol (e.g., BTC, ETH).
- **Real-Time Data**: Get the latest price updates from the cryptocurrency market.
- **Interactive Historical Charts**: Visualize price trends over time using interactive charts.
- **Technical Analysis Indicators**: Calculate and display results based on the following algorithms:
  - **RSI (Relative Strength Index)**: Measures the speed and change of price movements.
  - **MACD (Moving Average Convergence Divergence)**: Analyzes momentum to determine trend direction.
  - **Bollinger Bands**: Identifies overbought or oversold conditions.
- **Future Predictions**: Leverages technical indicators to forecast potential price movements, with percentage-based accuracy.

## Usage

1. Enter the cryptocurrency symbol (e.g., BTC, ETH) in the search bar.
2. Select a time period to analyze historical data (e.g., 1 day, 7 days, 30 days).
3. View the interactive chart displaying price trends.
4. Check the predictions generated by RSI, MACD, and Bollinger Bands.

## Technology Stack
- **Frontend**: Built with [Next.js](https://nextjs.org/) for optimized performance and server-side rendering.
- **Charting Library**: [Chart.js](https://www.chartjs.org/) is used to render interactive and visually appealing graphs.
- **Cryptocurrency API**: Fetches real-time and historical market data from [CryptoCompare](https://www.cryptocompare.com/).

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ViewMarket.git
   cd ViewMarket

2. Install dependencies:
   ```bash
    npm install

3. Create a .env.local file in the root directory and add your user data:
    ```bash
    NEXT_PUBLIC_LOGIN_USER0=your_username
    NEXT_PUBLIC_LOGIN_PASSWORD0=your_password
    
4. Start the development server:
     ```bash
    npm run dev

5. Open your browser and navigate to http://localhost:3000.

## Roadmap

- [ ] Add more technical indicators (e.g., EMA, Stochastic Oscillator).
- [ ] Integrate news updates for selected cryptocurrencies.
- [X] Add support for additional time frames (e.g., 6 months, 1 year).
- [ ] Visual Themes.
- [ ] Improve prediction accuracy with machine learning models.

## License

This project is licensed under the [Strict Open Use License (SOUL)](https://github.com/njoaco/viewmarket-crypto/blob/master/LICENSE.md)