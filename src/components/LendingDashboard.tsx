import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { AssetList } from './AssetList';

export const LendingDashboard: React.FC = () => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<'borrow' | 'lend'>('borrow');

  if (!address) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">Please connect your wallet</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold">DeFi Lending Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Automatically find and switch to the lowest borrowing rates across protocols
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('borrow')}
              className={`${
                activeTab === 'borrow'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Borrow
            </button>
            <button
              onClick={() => setActiveTab('lend')}
              className={`${
                activeTab === 'lend'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Lend
            </button>
          </nav>
        </div>

        <div className="mt-8">
          <AssetList />
        </div>
      </div>
    </div>
  );
};