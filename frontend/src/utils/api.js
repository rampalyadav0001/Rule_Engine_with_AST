// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/rule'; // Update with your backend URL

export const createRule = async (ruleName, ruleString) => {
  try {
    const response = await axios.post(`${API_URL}/create_rule`, {
      ruleString: ruleString,
      ruleName: ruleName,
    });
    return response.data;
  } catch (error) {
    console.error(
      'API call error:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const combineRules = async (rule1, rule2, operator) => {
  try {
    // Make the API request to combine the rules
    const response = await axios.post(`${API_URL}/combine_rules`, {
      rules: [rule1, rule2], // Assuming rule1 and rule2 are rule names in the database
      op: operator, // Sending the operator (AND/OR)
    });

    // Return the API response
    return response;
  } catch (error) {
    console.error(
      'API call error:',
      error.response ? error.response.data : error.message
    );
    throw error; // Propagate the error to the caller
  }
};

export  const evaluateRuleAPI = async (ruleName,data) => {
  try {
    // Make the API call to evaluate the rule

    const response = await axios.post(`${API_URL}/evaluate_rule`, {
      ast: ruleName, // Send the rule name (AST will be fetched from DB)
      data:data,
    });
    return response;
  } catch (error) {
    console.error(
      'API call error:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const getAllRules = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_rules`);
    return response;
  } catch (error) {
    console.error(
      'API call error:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
