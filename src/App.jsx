import { useEffect, useState } from 'react';
import HomePage from './pages/home';
import AboutPage from './pages/about';
import Header from './Component/Header';
import NotFoundPage from './pages/not-found';
import CoinDetailsPage from './pages/coin-details';
import {Routes, Route} from 'react-router';

// const API_URL =
//   'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
const API_URL = import.meta.env.VITE_COINS_API_URL;

const App = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit,setLimit]=useState(10);
  const [filter,setFilter]=useState('');
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



  return (
     <>
     <Header></Header>
    <Routes>
      <Route path='/' element={<HomePage 
      coins={coins} 
      filter={filter} 
      setFilter={setFilter} 
      limit={limit} 
      setLimit={setLimit} 
      sortBy={sortBy} 
      setSortBy={setSortBy} 
      loading={loading} 
      error={error}/>} />

      <Route path='/about' element={<AboutPage />} />
      <Route path='/coin/:id' element={<CoinDetailsPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
     </>
   
  );
};

export default App;