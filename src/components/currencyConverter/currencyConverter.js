import { useState, useEffect } from 'react';
import CurrencyOptions from '../currencyOptions/currencyOptions';
import ExchangeItem from '../exchangeItem/exchangeItem';

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
		if ((lastEdited === 'from' && amountFrom && currencyFrom && currencyTo) ||
			(lastEdited === 'to' && amountTo && currencyFrom && currencyTo)) {
			const rateFrom = findRate(currencyFrom);
			const rateTo = findRate(currencyTo);

			if (rateFrom && rateTo) {
				if (lastEdited === 'from') {
					const newAmountTo = convert(amountFrom, rateFrom / rateTo);
					setAmountTo(newAmountTo.toFixed(2));
				} else if (lastEdited === 'to') {
					const newAmountFrom = convert(amountTo, rateTo / rateFrom);
					setAmountFrom(newAmountFrom.toFixed(2));
				}
			}
		}
	}, [amountFrom, amountTo, currencyFrom, currencyTo, lastEdited, exchangeRates]);

	return (
		<div className='exchange-container'>
			<h1>Exchanger</h1>
			<ExchangeItem
				amount={amountFrom}
				onAmountChange={handleAmountFromChange}
				currency={currencyFrom}
				onCurrencyChange={(e) => setCurrencyFrom(e.target.value)}
				options={<CurrencyOptions exchangeRates={exchangeRates} />}
			/>
			<ExchangeItem
				amount={amountTo}
				onAmountChange={handleAmountToChange}
				currency={currencyTo}
				onCurrencyChange={(e) => setCurrencyTo(e.target.value)}
				options={<CurrencyOptions exchangeRates={exchangeRates} />}
			/>
		</div>
	);
};
export default CurrencyConverter;