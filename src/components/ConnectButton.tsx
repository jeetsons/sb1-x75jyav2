import React from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export const ConnectButton: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <button
        onClick={() => disconnect()}
        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
      >
        Disconnect {address?.slice(0, 6)}...{address?.slice(-4)}
      </button>
    );
  }

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
          disabled={!connector.ready || isLoading}
        >
          Connect {connector.name}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}
    </div>
  );
};