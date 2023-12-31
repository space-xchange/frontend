import PropTypes from 'prop-types'
import { useState, useMemo } from 'react'
import { toast } from 'react-toastify';

import useCoinStore from '@/stores/coins'
import TradingCoinsSelection from '@/components/Trading/TradingCoinsSelection'

/**
 * A Trading Box for buying and selling coins
 *
 * @component
 */
export default function TradingBox({ coin }) {
	const pages = useMemo(
		() => [`Buy ${coin.name}`, `Sell ${coin.name}`],
		[coin]
	)
	const [pageId, setPageId] = useState(0)
  const [amount, setAmount] = useState(0)

	const curHour = new Date().getHours()

	return (
		<>
			<ul
				mb="5"
				display="flex"
				flex="row wrap"
				border="b-0"
				p="l-0"
				list="none"
				w="full"
			>
				{pages.map((p, id) => (
					<li
						role="presentation"
						flex="auto"
						text="slate-200 center"
						onClick={() => setPageId(id)}
						key={id}
					>
						<span
							m="y-2"
							display="block"
							bg="hover:slate-900"
							border="x-0 b-2 t-0 hover:blue-500 solid"
							p="x-7 b-5.5 t-6"
							text="xs medium slate-200"
							leading="titght"
							className={
								'hover:isolate focus:isolate uppercase no-underline' +
								(pageId === id
									? ' border-blue-300 bg-slate-700'
									: ' border-transparent bg-slate-600')
							}
							key={p}
						>
							{p}
						</span>
					</li>
				))}
			</ul>
			<div>
				<input
					p="x-2 y-10"
					w="full"
					rounded="lg"
					text="slate-200 lg"
					bg="slate-800"
					outline="transparent"
					border="2 slate-200 solid"
					placeholder={pages[pageId].split(' ')[0]}
          value={amount}
          onChange={event => setAmount(event.target.value)}
					m="b-3"
				/>
				<div m="y-3" text="slate-200 3xl" display="flex" justify="between">
					<span>1 {coin.name} </span> <span> = </span>
          <span>A&#36;{Math.floor(coin.values[0].value_aud * 100) / 100}</span>
				</div>
				<button
					p="x-1.5 y-5.5"
					m="t-3 b-10"
					w="full"
					bg="slate-400 hover:slate-500"
					shadow="md"
					rounded="md"
					text="slate-900 lg"
					border="0"
					className="upperclase"
          onClick={async () => {
            const req = await fetch(`http://localhost:8000/v1/dapp/${pageId ? "sell" : "buy"}`, {
              method: "POST",
              credentials: "include",
              mode: "cors", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                crypto: coin.name,
                amount: Number(amount),
              })
            })
            
            const res = await req.json()
            if (res.hasOwnProperty('detail')) {
              toast.error(res.detail)
              return
            }

            toast.success("Succeed")
          }}
				>
					{pages[pageId].split(' ')[0]}
				</button>
			</div>
		</>
	)
}

TradingBox.propTypes = {
	/**
	 * Coin's name
	 */
	coin: PropTypes.string.isRequired,
}
