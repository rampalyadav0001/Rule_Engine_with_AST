import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  ruleName: {
    type: String,
    required: true,
    
  },
  ruleAST: {
    type: Object,
    required: true,
  },
});

export const Rule = mongoose.model('Rule', ruleSchema);
