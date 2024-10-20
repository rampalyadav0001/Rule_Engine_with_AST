import React, { useEffect, useState } from 'react';
import { getAllRules } from '../utils/api';

// Helper function to parse the rule tree into a string expression
const parseRuleTree = (node) => {
  if (!node) return '';
  if (node.type === 'operand') {
    return `${node.key} ${node.operator} ${node.value}`;
  }
  if (node.type === 'operator') {
    const left = parseRuleTree(node.left);
    const right = parseRuleTree(node.right);
    return `(${left} ${node.operator} ${right})`;
  }
  return '';
};

// Tree rendering function
const printTree = (node, prefix = '', isLeft = true) => {
  if (!node) return null;

  // Display based on node type (operator/operand)
  const operatorDisplay = node.type === 'operator'
    ? node.operator
    : `${node.key} ${node.operator} ${node.value}`;

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

const DisplayRule = () => {
  const [rules, setRules] = useState([]);

  const fetchRules = async () => {
    try {
      const response = await getAllRules();
      setRules(response.data);
    } catch (error) {
      console.error('Error fetching rules:', error);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-yellow-300 py-8 px-4 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6 text-yellow-500">All Rules</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Column Titles */}
          <div className="font-bold text-xl">Rule Name</div>
          <div className="font-bold text-xl">Parsed Rule Expression</div>
          <div className="font-bold text-xl">Rule Tree</div>

          {/* Render each rule */}
          {rules.map((rule) => (
            <React.Fragment key={rule._id}>
              {/* Rule Name */}
              <div className="bg-gray-700 p-4 rounded-lg">
                {rule.ruleName}
              </div>

              {/* Parsed Rule Expression */}
              <div className="bg-gray-700 p-4 rounded-lg text-wrap overflow-auto max-h-auto">
                <pre className="whitespace-normal">{parseRuleTree(rule.ruleAST)}</pre>
              </div>

              {/* Rule Tree */}
              <div className="bg-gray-700 p-4 rounded-lg overflow-auto max-h-48 ">
                {printTree(rule.ruleAST)}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayRule;
