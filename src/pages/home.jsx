import CoinCard from '../Component/CoinCard';
import LimitSelector from '../Component/LimitSelector';
import FilterInput from '../Component/FilterInput';
import SortSelector from '../Component/SortSelector';
import Spinner from '../Component/Spinner';

const HomePage = ({
    coins,
    filter,
    setFilter,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    loading,
    error
}) => 
    {   
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
                {loading && <Spinner color='white'/>}
                {error && (
                    <div className='error'>
                    <p>❌ {error}</p>
                    </div>
                )}

                <div className='top-controls'>
                <FilterInput filter={filter} onFilterChange={setFilter} ></FilterInput>
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
    }
 
export default HomePage;