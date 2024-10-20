import express from 'express';
import ruleController from '../controllers/ruleController.js';
const router = express.Router();

router.route('/create_rule').post(ruleController.createRule);
router.route('/combine_rules').post(ruleController.combineRules);
router.route('/evaluate_rule').post(ruleController.evaluateRule);
router.route('/get_rules').get(ruleController.fetchallRules);

export default router;
