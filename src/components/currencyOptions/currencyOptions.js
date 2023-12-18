const CurrencyOptions = ({ exchangeRates }) =>{
	const item = exchangeRates.map((currency) => (
		<option key={currency.r030} value={currency.cc}>
			{currency.txt}
		</option>
	))

	return item;
}

export default CurrencyOptions;