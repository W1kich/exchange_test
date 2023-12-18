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

export default ExchangeRates;