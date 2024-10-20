import React, { useState } from 'react';
import { evaluateRuleAPI } from '../utils/api'; // Import API function

const EvaluateRule = () => {
  const [ruleName, setRuleName] = useState('Rule-1');
  const [jsonData, setJsonData] = useState('');
  const [result, setResult] = useState(null);

  const handleEvaluateRule = async () => {
    // Renamed function to handleEvaluateRule
    try {
      // Parse the JSON data input
      const data = JSON.parse(jsonData);

      // Call the API to evaluate the rule
      const response = await evaluateRuleAPI(ruleName, data);

      // Handle the response from the API
      const { result: ruleResult } = response.data;

      // Set the result state with the evaluation result
      setResult({ result: ruleResult });
    } catch (error) {
      // Handle any errors (invalid JSON or API call failure)
      console.error('Error evaluating rule:', error);
      setResult({ error: 'Failed to evaluate rule. Check your input.' });
    }
  };

  return (
    <div className='min-h-screen bg-gray-900 text-yellow-300 py-8 px-4 flex justify-center items-center'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl'>
        <h1 className='text-center text-3xl font-bold mb-6 text-yellow-500'>
          Evaluate Rule
        </h1>

        {/* Rule Name Input */}
        <div className='mb-4'>
          <label className='block text-lg mb-2' htmlFor='ruleName'>
            Rule Name:
          </label>
          <input
            id='ruleName'
            type='text'
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
            className='w-full px-4 py-2 bg-gray-700 border border-yellow-500 rounded-lg text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            placeholder='Enter rule name...'
          />
        </div>

        {/* JSON Data Input */}
        <div className='mb-4'>
          <label className='block text-lg mb-2' htmlFor='jsonData'>
            Data JSON:
          </label>
          <textarea
            id='jsonData'
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            rows={8}
            className='w-full px-4 py-2 bg-gray-700 border border-yellow-500 rounded-lg text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500'
            placeholder='Enter your JSON data here...'
          />
        </div>

        {/* Evaluate Rule Button */}
        <button
          onClick={handleEvaluateRule} // Use the renamed function here
          className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out'
        >
          Evaluate Rule
        </button>

        {/* Result Visualization */}
        <div className='mt-6'>
          {result && (
            <pre
              className={`bg-gray-800 p-4 rounded transition-all duration-300 ${
                result.error ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {result.error
                ? result.error
                : `Result: ${result.result ? 'TRUE' : 'FALSE'}`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluateRule;
