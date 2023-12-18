const ExchangeRates = ({ exchangeData }) => {
	const items = exchangeData
	.filter((item) => item.cc === 'USD' || item.cc === 'EUR')
	.map((rate) => (
		<div className='text2' key={rate.r030}>
			<p>{rate.cc}</p>
			<p>{rate.rate.toFixed(2)}</p>
		</div>
	))
	
	console.log(items);

	return (
		<header>
			<h1>Exchange Rates</h1>
			<div className='exchangeData'>
				{items}
			</div>
		</header>
	);
};

export default ExchangeRates;