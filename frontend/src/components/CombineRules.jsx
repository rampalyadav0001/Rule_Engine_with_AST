import React, { useState } from 'react';
import axios from 'axios'; // or use 'fetch' if you prefer
import { combineRules } from '../utils/api';
const CombineRules = () => {
  const [rule1, setRule1] = useState('');
  const [rule2, setRule2] = useState('');
  const [operator, setOperator] = useState('AND');
  const [combinedRule, setCombinedRule] = useState('');
  const [combinedRuleName, setCombinedRuleName] = useState('');
  const [combinedRuleAST, setCombinedRuleAST] = useState(null);

  const handleCombineRules = async () => {
    
    
    try {
      // Await the API call
      const response = await combineRules(rule1, rule2, operator);
      
      // Destructure the response data
      const { ruleName, ruleAST } = response.data;
  
      // Update the state with the combined rule details
      setCombinedRuleName(ruleName);
      setCombinedRuleAST(ruleAST);
  
      // Optional: Display the combined rule name visually
      setCombinedRule(`Combined Rule Name: ${ruleName}`);
    } catch (error) {
      console.error('Error combining rules:', error);
      // Handle error state if needed
    }
  };
  
  

  // Recursive function to generate HTML for the rule tree (AST)
  const generateTreeHTML = (node, prefix = '', isLeft = true) => {
    if (!node) return null;

    return (
      <div key={prefix + (node.key || node.operator)}>
        <span>
          {prefix}
          {isLeft ? '├── ' : '└── '}
          {node.type === 'operator'
            ? node.operator
            : `${node.key} ${node.operator} ${node.value}`}
        </span>
        <div>
          {node.type === 'operator' && (
            <>
              {node.left &&
                generateTreeHTML(
                  node.left,
                  prefix + (isLeft ? '│   ' : '    '),
                  true
                )}
              {node.right &&
                generateTreeHTML(
                  node.right,
                  prefix + (isLeft ? '│   ' : '    '),
                  false
                )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='min-h-screen bg-gray-900 text-yellow-300 py-8 px-4 flex justify-center items-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl'>
        <h1 className='text-3xl font-bold text-center mb-6 text-yellow-500'>
          Combine Rules
        </h1>

        {/* Rule 1 Input */}
        <div className='mb-4'>
          <label className='block text-lg mb-2' htmlFor='rule1'>
            Rule 1:
          </label>
          <input
            id='rule1'
            type='text'
            className='w-full px-4 py-2 bg-gray-700 text-yellow-300 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            placeholder='Enter first rule'
            value={rule1}
            onChange={(e) => setRule1(e.target.value)}
          />
        </div>

        {/* Operator Dropdown */}
        <div className='mb-4'>
          <label className='block text-lg mb-2' htmlFor='operator'>
            Operator:
          </label>
          <select
            id='operator'
            className='w-full px-4 py-2 bg-gray-700 text-yellow-300 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
          >
            <option value='AND'>AND</option>
            <option value='OR'>OR</option>
          </select>
        </div>

        {/* Rule 2 Input */}
        <div className='mb-6'>
          <label className='block text-lg mb-2' htmlFor='rule2'>
            Rule 2:
          </label>
          <textarea
            id='rule2'
            className='w-full h-24 px-4 py-2 bg-gray-700 text-yellow-300 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500'
            placeholder='Enter second rule'
            value={rule2}
            onChange={(e) => setRule2(e.target.value)}
          />
        </div>

        {/* Combine Rules Button */}
        <button
          onClick={handleCombineRules}
          className='w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
        >
          Combine Rules
        </button>

        {/* Combined Rule Visualization */}
        {combinedRuleAST && (
          <div className='mt-8'>
            <h2 className='text-lg font-bold'>Combined Rule Visualization:</h2>
            <div className='bg-gray-800 p-4 mt-4 text-yellow-400'>
              <pre className='whitespace-pre-wrap'>
                {generateTreeHTML(combinedRuleAST)}
              </pre>
            </div>
            <div className='mt-2'>
              <span className='font-semibold'>Combined Rule Name: </span>
              {combinedRuleName}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CombineRules;
