import PropTypes from 'prop-types'
import MarketTableData from '@/components/MarketTable/MarketTableData'
import MarketTableTextCell from '@/components/MarketTable/MarketTableTextCell'

/**
 * Pre-styled sub component for rows of the Market Table
 *
 * @component
 */
export default function MarketTableRow({ coin }) {
	return (
		<tr bg="hover:slate-950">
			<MarketTableData align="right" display="flex">
				<img src={coin[1].img} alt={coin[0]} w="[24px]" h="[24px]" />
				<MarketTableTextCell>{coin[0]}</MarketTableTextCell>
			</MarketTableData>
			<MarketTableData align="center">
				<MarketTableTextCell>{coin[1].values.changes[0]}</MarketTableTextCell>
			</MarketTableData>
			<MarketTableData align="right">
				<MarketTableTextCell
					textStyle={
						(coin[1].values.diff >= 0 ? 'text-green-500' : 'text-red-500') + ' md:text-base text-xs text-medium'
					}
				>
					{coin[1].values.diff.toFixed(2)}%
				</MarketTableTextCell>
			</MarketTableData>
		</tr>
	)
}

MarketTableRow.propTypes = {
	/**
	 * Coin's object data
	 */
	coin: PropTypes.array.isRequired,
}