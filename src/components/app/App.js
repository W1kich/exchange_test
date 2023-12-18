import { useState, useEffect } from 'react';
import fetchData from '../../services/nbu';
import CurrencyConverter from '../currencyConverter/currencyConverter';
import ExchangeRates from '../exchangeRates/exchangeRates';
import "./App.css";





const App = () => {
	const [exchangeData, setExchangeData] = useState([]);

	useEffect(() => {
		const apiUrl = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

		const fetchExchangeRates = async () => {
			try {
				const data = await fetchData(apiUrl);
				setExchangeData(data);
			} catch (error) {
				console.error('Error in App component:', error);
			}
		};

		fetchExchangeRates();
	}, []);

	return (
		<div className='app'>
			<ExchangeRates exchangeData={exchangeData} />
			<CurrencyConverter exchangeRates={exchangeData} />
		</div>
	);
}	

export default App;
