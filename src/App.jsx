import { useEffect, useState } from 'react';
import CoinCard from './Component/CoinCard';
import LimitSelector from './Component/LimitSelector';
import FilterInput from './Component/FliterInput';
import SortSelector from './Component/SortSelector';
// const API_URL =
//   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit,setLimit]=useState(10);
  const [filter,setFliter]=useState('');
  const [sortBy,setSortBy]=useState('market_cap_desc');

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

const filteredCoins = coins
  .filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  )
  .slice() // 🔥 Important: make a shallow copy before sorting!
  .sort((a, b) => {
    switch (sortBy) {
      case 'market_cap_desc':
        return b.market_cap - a.market_cap;
      case 'price_desc':
        return b.current_price - a.current_price;
      case 'price_asc':
        return a.current_price - b.current_price;
      case 'change_desc':
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      case 'change_asc':
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      default:
        return 0;
    }
  });

  return (
    <div>
      <h1>🚀 Crypto Dash</h1>
       {loading && <p>Loading...</p>}
      {error && (
        <div className='error'>
          <p>❌ {error}</p>
        </div>
      )}

    <div className='top-controls'>
    <FilterInput filter={filter} onFilterChange={setFliter} ></FilterInput>
    <LimitSelector limit={limit} onLimitChange={setLimit}/>
    <SortSelector sortBy={sortBy} onSortChange={setSortBy}></SortSelector>
    </div>

      {!loading && !error && (
        <main className='grid'>
          {filteredCoins.length>0?filteredCoins.map(
            (coin) => (
            <CoinCard key={coin.id} coin={coin}></CoinCard>
          ))
          :(<p>No Matching coins</p>)}
        </main>
      )}
    </div>
  );
};

export default App;