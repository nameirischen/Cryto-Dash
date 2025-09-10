import { useEffect, useState } from 'react';
import CoinCard from './Component/CoinCard';
import LimitSelector from './Component/LimitSelector';
// const API_URL =
//   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [limit,setLimit]=useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(`${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
        if (!res.ok) throw new Error('Failed to fetch data');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
       {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

    <LimitSelector limit={limit} onLimitChange={setLimit}></LimitSelector>

      {!loading && !error && (
        <main className='grid'>
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin}></CoinCard>
          ))}
        </main>
      )}
    </div>
  );
};

export default App;