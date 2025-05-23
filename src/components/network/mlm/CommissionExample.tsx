
import React from 'react';
import { CommissionResult } from '@/services/CommissionTypes';

interface CommissionExampleProps {
  profitExample: number;
  performanceFee: number;
  masterTraderFee: number;
  networkFee: number;
  distributionExample: string[];
}

const CommissionExample: React.FC<CommissionExampleProps> = ({
  profitExample,
  performanceFee,
  masterTraderFee,
  networkFee,
  distributionExample
}) => {
  return (
    <div className="w-full md:w-1/2">
      <h3 className="text-white font-semibold mb-3">Commission Distribution Example</h3>
      <div className="bg-black/40 rounded-lg p-4 border border-white/10">
        <p className="text-gray-300 mb-3">For a trade profit of <span className="text-white font-bold">{profitExample} SOL</span>:</p>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Total performance fee (30%)</span>
            <span className="text-white font-medium">{performanceFee.toFixed(2)} SOL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Master trader (10%)</span>
            <span className="text-white font-medium">{masterTraderFee.toFixed(2)} SOL</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network distribution (20%)</span>
            <span className="text-white font-medium">{networkFee.toFixed(2)} SOL</span>
          </div>
          <div className="border-t border-white/10 pt-3 text-sm">
            <p className="text-white mb-2">In this upline structure with rank compression:</p>
            <ul className="space-y-2 text-gray-300">
              {distributionExample.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
            <p className="mt-4 text-blue-400">The system ensures efficient distribution with rank-based compression</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionExample;
