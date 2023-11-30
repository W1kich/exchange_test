import React, { useState, useEffect } from 'react';
import "./App.css"

const ExchangeRates = ({ exchangeData }) => {
	return (
		<header>
			<h1>Exchange Rates</h1>
			<div className='exchangeData'>
				{exchangeData
					.filter((item) => item.cc === 'USD' || item.cc === 'EUR')
					.map((rate) => (
						<div className='text2' key={rate.r030}>
							<p>{rate.cc}</p>
							<p>{rate.rate.toFixed(2)}</p>
						</div>
					))}
			</div>
		</header>
	);
};

const CurrencyConverter = ({ exchangeRates }) => {
	const [amountFrom, setAmountFrom] = useState(1);
	const [amountTo, setAmountTo] = useState('');
	const [currencyFrom, setCurrencyFrom] = useState('USD');
	const [currencyTo, setCurrencyTo] = useState('EUR');
	const [lastEdited, setLastEdited] = useState('from');

	const findRate = (currency) => {
		return exchangeRates.find(item => item.cc === currency)?.rate || 0;
	};

	const convert = (amount, rate) => {
		return amount * rate;
	};

	const handleAmountFromChange = (e) => {
		setLastEdited('from');
		setAmountFrom(e.target.value);
	};

	const handleAmountToChange = (e) => {
		setLastEdited('to');
		setAmountTo(e.target.value);
	};

	useEffect(() => {
		if (lastEdited === 'from' && currencyFrom && currencyTo) {
			const rateFrom = findRate(currencyFrom);
			const rateTo = findRate(currencyTo);
			if (rateFrom && rateTo) {
				const newAmountTo = convert(amountFrom, rateFrom / rateTo);
				setAmountTo(newAmountTo.toFixed(2));
			}
		}
	}, [amountFrom, currencyFrom, currencyTo, lastEdited, exchangeRates]);

	useEffect(() => {
		if (lastEdited === 'to' && currencyFrom && currencyTo) {
			const rateFrom = findRate(currencyFrom);
			const rateTo = findRate(currencyTo);
			if (rateFrom && rateTo) {
				const newAmountFrom = convert(amountTo, rateTo / rateFrom);
				setAmountFrom(newAmountFrom.toFixed(2));
			}
		}
	}, [amountTo, currencyFrom, currencyTo, lastEdited, exchangeRates]);

	return (
		<div className='exchange-container'>
			<h1>Exchenger</h1>
			<div className='exchange-item'>
				<input
					className='text1'
					type="text"
					value={amountFrom}
					onChange={handleAmountFromChange}
				/>
				<select
					className='text1'
					value={currencyFrom}
					onChange={(e) => setCurrencyFrom(e.target.value)}
				>
					{exchangeRates.map((currency) => (
						<option key={currency.r030} value={currency.cc}>
							{currency.txt}
						</option>
					))}
				</select>
			</div>
			<div className='exchange-item'>
				<input 
					className='text1'
					type="text"
					value={amountTo}
					onChange={handleAmountToChange}
				/>
				<select
					className='text1'
					value={currencyTo}
					onChange={(e) => setCurrencyTo(e.target.value)}
				>
					{exchangeRates.map((currency) => (
						<option key={currency.r030} value={currency.cc}>
							{currency.txt}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};



const App = () => {
	const [exchangeData, setExchangeData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
				let data = await response.json();
				// Create a new array that includes UAH and the fetched data
				const dataWithUAH = [{r030: 980, txt: 'Українська Гривня', rate: 1, cc: 'UAH'}, ...data];
				setExchangeData(dataWithUAH);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
	
		fetchData();
	}, []);
	
	return (
		<div className='app'>
			<ExchangeRates exchangeData={exchangeData} />
			<CurrencyConverter exchangeRates={exchangeData} />
		</div>
	);
}	

export default App;
