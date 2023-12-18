const ExchangeItem = ({ amount, onAmountChange, currency, onCurrencyChange, options }) => (
	<div className='exchange-item'>
		<input
			className='text1'
			type="text"
			value={amount}
			onChange={onAmountChange}
		/>
		<select
			className='text1'
			value={currency}
			onChange={onCurrencyChange}
		>
			{options}
		</select>
	</div>
);

export default ExchangeItem;