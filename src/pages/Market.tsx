// src/pages/Market.tsx

import { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { TrendingUp, TrendingDown } from 'lucide-react'

const COINS = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 6842350, change: 2.34, logo: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 358420, change: -1.12, logo: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 14280, change: 5.67, logo: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    { id: 'xrp', name: 'XRP', symbol: 'XRP', price: 48, change: -0.89, logo: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png' },
    { id: 'dogecoin', name: 'Dogecoin', symbol: 'DOGE', price: 14, change: 3.21, logo: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    { id: 'cardano', name: 'Cardano', symbol: 'ADA', price: 38, change: -2.45, logo: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
]

export default function Market() {
    const { theme } = useStore()
    const isDark = theme === 'dark'

    const [prices, setPrices] = useState(COINS)

    useEffect(() => {
        const interval = setInterval(() => {
            setPrices((prev) =>
                prev.map((coin) => ({
                    ...coin,
                    price: Math.round(coin.price * (1 + (Math.random() - 0.5) * 0.002)),
                    change: parseFloat((coin.change + (Math.random() - 0.5) * 0.1).toFixed(2)),
                }))
            )
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-6 w-full pb-10">

            {/* Header */}
            <div>
                <h1 className={`text-[22px] font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                    Live Market
                </h1>
                <p className={`text-[13px] mt-1 ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                    Crypto market overview · Updates every 5 seconds
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {prices.map((coin) => (
                    <div
                        key={coin.id}
                        className={`rounded-2xl border p-6 flex flex-col gap-4 transition-all duration-300
              ${isDark
                                ? 'bg-[#13131A] border-[#1E1E2E] hover:border-[#334155] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
                                : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
                            }`}
                    >
                        {/* Top: Logo + Name */}
                        <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center
                ${isDark ? 'bg-[#1E293B]' : 'bg-[#F1F5F9]'}`}>
                                <img
                                    src={coin.logo}
                                    alt={coin.name}
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement
                                        target.style.display = 'none'
                                        target.parentElement!.innerHTML = `<span style="font-size:11px;font-weight:900;color:#94A3B8">${coin.symbol}</span>`
                                    }}
                                />
                            </div>
                            <div>
                                <p className={`text-[15px] font-bold ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                                    {coin.name}
                                </p>
                                <p className={`text-[11px] font-semibold ${isDark ? 'text-[#475569]' : 'text-[#94A3B8]'}`}>
                                    {coin.symbol}
                                </p>
                            </div>
                        </div>

                        {/* Bottom: Price + Change */}
                        <div className="flex items-end justify-between">
                            <p className={`text-[22px] font-black tabular-nums leading-none
                ${isDark ? 'text-[#F1F5F9]' : 'text-[#0F172A]'}`}>
                                ₹{coin.price.toLocaleString('en-IN')}
                            </p>
                            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-black
                ${coin.change >= 0
                                    ? 'bg-emerald-500/10 text-emerald-500'
                                    : 'bg-red-500/10 text-red-500'
                                }`}>
                                {coin.change >= 0
                                    ? <TrendingUp size={13} strokeWidth={2.5} />
                                    : <TrendingDown size={13} strokeWidth={2.5} />
                                }
                                {coin.change >= 0 ? '+' : ''}{coin.change}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}