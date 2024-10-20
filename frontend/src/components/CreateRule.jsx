// src/components/CreateRule.jsx
import React, { useState } from 'react';
import { createRule } from '../utils/api';

const CreateRule = () => {
  const [ruleName, setRuleName] = useState('');
  const [rule, setRule] = useState('');
  const [ruleTree, setRuleTree] = useState(null); // State to store the rule tree

  const handleCreateRule = async () => {
    console.log(`Rule Created: ${ruleName}, Rule: ${rule}`);
    try {
      const data = await createRule(ruleName, rule);
      console.log("after api call",data);
      setRuleTree(data); // Assuming 'data' contains the tree structure
    } catch (error) {
      console.error('Error creating rule:', error);
    }
  };

  // Function to print the tree structure
  const printTree = (node, prefix = '', isLeft = true) => {
    if (!node) return null;
  
    // Prepare the display text based on the type of node
    const operatorDisplay = node.type === 'operator' 
      ? node.operator 
      : `${node.key} ${node.operator} ${node.value}`;
  
    // Use a unique key based on the node's properties
    const uniqueKey = `${prefix}${node.key || node.operator}-${Math.random()}`;
  
    return (
      <div key={uniqueKey}>
        <span>
          {prefix}
          {isLeft ? '├── ' : '└── '}
          {operatorDisplay}
        </span>
        <div>
          {node.type === 'operator' && (
            <>
              {node.left && printTree(node.left, prefix + (isLeft ? '│   ' : '    '), true)}
              {node.right && printTree(node.right, prefix + (isLeft ? '│   ' : '    '), false)}
            </>
          )}
        </div>
      </div>
    );
  };
  
  


  return (
    <div className="min-h-screen bg-gray-900 text-yellow-300 py-8 px-4 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-500">Create Rule</h1>

        {/* Rule Name Input */}
        <div className="mb-4">
          <label className="block text-lg mb-2" htmlFor="ruleName">Rule Name:</label>
          <input
            id="ruleName"
            type="text"
            className="w-full px-4 py-2 bg-gray-700 text-yellow-300 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter rule name"
            value={ruleName}
            onChange={(e) => setRuleName(e.target.value)}
          />
        </div>

        {/* Rule Input */}
        <div className="mb-6">
          <label className="block text-lg mb-2" htmlFor="rule">Rule:</label>
          <textarea
            id="rule"
            className="w-full h-24 px-4 py-2 bg-gray-700 text-yellow-300 border border-yellow-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter the rule logic"
            value={rule}
            onChange={(e) => setRule(e.target.value)}
          />
        </div>

        {/* Create Rule Button */}
        <button
          onClick={handleCreateRule}
          className="w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Create Rule
        </button>

        {/* Rule Visualization */}
        <div className="mt-8">
          <h2 className="text-lg font-bold">Rule Visualization:</h2>
          <div className="bg-gray-800 p-4 mt-4 text-yellow-400">
            <pre className="whitespace-pre-wrap">
              {ruleTree ? printTree(ruleTree.ruleAST) : 'No rules created yet.'}
            </pre>
          </div>
          <div className="mt-2">
            <span className="font-semibold">Rule Name: </span>{ruleName || 'Rule-1'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRule;
