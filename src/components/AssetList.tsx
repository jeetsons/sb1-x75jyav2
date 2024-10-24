import React from 'react';
import { useProtocolRates } from '../hooks/useProtocolRates';

interface Asset {
  symbol: string;
  name: string;
  icon: string;
}

const SUPPORTED_ASSETS: Asset[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
  { symbol: 'USDC', name: 'USD Coin', icon: '💵' },
  { symbol: 'DAI', name: 'Dai', icon: '🟡' },
];

export const AssetList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {SUPPORTED_ASSETS.map((asset) => (
        <AssetCard key={asset.symbol} asset={asset} />
      ))}
    </div>
  );
};

const AssetCard: React.FC<{ asset: Asset }> = ({ asset }) => {
  const { rates, loading, getBestRate } = useProtocolRates(asset.symbol);
  const bestRate = getBestRate();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center space-x-4">
        <span className="text-2xl">{asset.icon}</span>
        <div>
          <h3 className="text-lg font-medium">{asset.name}</h3>
          <p className="text-sm text-gray-500">{asset.symbol}</p>
        </div>
      </div>
      
      <div className="mt-4">
        {loading ? (
          <p className="text-sm text-gray-500">Loading rates...</p>
        ) : (
          <>
            <p className="text-sm font-medium">Best borrow rate:</p>
            <p className="text-lg font-bold">
              {bestRate ? `${(bestRate.apy * 100).toFixed(2)}% on ${bestRate.protocol}` : 'No rates available'}
            </p>
          </>
        )}
      </div>
    </div>
  );
};