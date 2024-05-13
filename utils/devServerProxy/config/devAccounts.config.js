export default {
    DEV00000000NI: ['US', ['v2_ppc_ni'], 'ppc_ni_nq'],
    DEV0000000NIQ: ['US', ['v2_ppc_ni'], 'ppc_ni_q'],
    DEV000NINONUS: ['US', ['v2_ppc_ni'], 'ppc_ni_nq_xb'],
    DEV00NINONUSQ: ['US', ['v2_ppc_ni'], 'ppc_ni_q_xb'],
    DEV0000000EAZ: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_nq_eqz'],
    DEV0000000EAG: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_nq_gtz'],
    DEV0000000PSZ: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_single_eqz'],
    DEV0000000PSG: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_single_gtz'],
    DEV0000000PMZ: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_multi_eqz'],
    DEV0000000PMG: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_multi_gtz'],
    DEV000000GPLQ: ['US', ['v2_short_term'], 'short_term_q'],
    DEV0000000GPL: ['US', ['v2_short_term'], 'short_term_nq'],
    DEV00000GPLNQ: ['US', ['v2_short_term'], 'short_term_nq'],

    // US Long Term
    DEV0USGENERIC: ['US', ['v2_product_list'], 'generic'],
    DEV00USLTMQGZ: ['US', ['v2_long_term'], 'long_term_multi_gtz'],
    DEV00USLTMQEZ: ['US', ['v2_long_term'], 'long_term_multi_eqz'],
    DEVUSLTMQEZRB: ['US', ['v2_long_term'], 'long_term_multi_eqz_mixed'],
    DEV00USLTNQEZ: ['US', ['v2_long_term'], 'long_term_nq_eqz'],
    DEV00USLTNQGZ: ['US', ['v2_long_term'], 'long_term_nq_gtz'],
    DEV00USLTSQGZ: ['US', ['v2_long_term'], 'long_term_single_gtz'],
    DEV00USLTSQEZ: ['US', ['v2_long_term'], 'long_term_single_eqz'],
    DEVUSLTSQEZRB: ['US', ['v2_long_term'], 'long_term_single_eqz_mixed'],

    // Buttons Messages
    // generic pay later
    DEV0GENERICPL: ['US', ['v2_product_list'], 'buttons/generic_pay_later'],
    // generic pay later - bnpl
    DEV000GENBNPL: ['US', ['v2_product_list'], 'buttons/generic_pay_later_bnpl'],
    // generic paypal
    DEV000GENPYPL: ['US', ['v2_product_list'], 'buttons/generic_paypal'],
    // paypal purchase protection
    DEV0BTNPYPLPP: ['US', ['v2_product_list'], 'buttons/purchase_protection'],
    // Buttons LT MQ GTZ
    DEVBTNLTMQGTZ: ['US', ['v2_long_term'], 'buttons/long_term_multi_gtz'],
    // Buttons LT MQ EQZ
    DEVBTNLTMQEQZ: ['US', ['v2_long_term'], 'buttons/long_term_multi_eqz'],
    // Buttons LT NQ GTZ
    DEVBTNLTNQGTZ: ['US', ['v2_long_term'], 'buttons/long_term_nq_gtz'],
    // Buttons LT MQ EQZ
    DEVBTNLTNQEQZ: ['US', ['v2_long_term'], 'buttons/long_term_nq_eqz'],
    // Buttons LT SQ GTZ
    DEVBTNLTSQGTZ: ['US', ['v2_long_term'], 'buttons/long_term_single_gtz'],
    // Buttons LT SQ EQZ
    DEVBTNLTSQEQZ: ['US', ['v2_long_term'], 'buttons/long_term_single_eqz'],
    // Buttons ST NQ
    DEV00BTNSTSNQ: ['US', ['v2_short_term'], 'buttons/short_term_nq'],
    // Buttons ST Q
    DEV000BTNSTSQ: ['US', ['v2_short_term'], 'buttons/short_term_q'],

    // Marks Messages
    // generic pay later
    DEV00MRKGENPL: ['US', ['v2_product_list'], 'marks/generic_pay_later'],
    // generic pay later - bnpl
    DEVMRKGENBNPL: ['US', ['v2_product_list'], 'marks/generic_pay_later_bnpl'],
    // generic paypal
    DEVMRKGENPYPL: ['US', ['v2_product_list'], 'marks/generic_paypal'],
    // paypal purchase protection
    DEV0MRKPYPLPP: ['US', ['v2_product_list'], 'marks/purchase_protection'],
    // Marks LT MQ GTZ
    DEVMRKLTMQGTZ: ['US', ['v2_long_term'], 'marks/long_term_multi_gtz'],
    // Marks LT MQ EQZ
    DEVMRKLTMQEQZ: ['US', ['v2_long_term'], 'marks/long_term_multi_eqz'],
    // Marks LT NQ GTZ
    DEVMRKLTNQGTZ: ['US', ['v2_long_term'], 'marks/long_term_nq_gtz'],
    // Marks LT MQ EQZ
    DEVMRKLTNQEQZ: ['US', ['v2_long_term'], 'marks/long_term_nq_eqz'],
    // Marks LT SQ GTZ
    DEVMRKLTSQGTZ: ['US', ['v2_long_term'], 'marks/long_term_single_gtz'],
    // Marks LT SQ EQZ
    DEVMRKLTSQEQZ: ['US', ['v2_long_term'], 'marks/long_term_single_eqz'],
    // Marks ST NQ
    DEV00MRKSTSNQ: ['US', ['v2_short_term'], 'marks/short_term_nq'],
    // Marks ST Q
    DEV000MRKSTSQ: ['US', ['v2_short_term'], 'marks/short_term_q'],

    // Multi product modal
    DEV00000NIGPL: ['US', ['v2_short_term', 'v2_ppc_ni'], 'short_term_nq'],

    DEV000DEPLEQZ: ['DE', ['long_term'], 'gpl_eqz'],
    DEV000DEPLGTZ: ['DE', ['long_term'], 'gpl_gtz'],
    DEV00DEPLQEQZ: ['DE', ['long_term'], 'gplq_eqz'],
    DEV00DEPLQGTZ: ['DE', ['long_term'], 'gplq_gtz'],
    DEV0XBDEPLEQZ: ['DE', ['long_term'], 'gpl_eqz-non-de'],
    DEV0XBDEPLGTZ: ['DE', ['long_term'], 'gpl_gtz-non-de'],
    DEVXBDEPLQEQZ: ['DE', ['long_term'], 'gplq_eqz-non-de'],
    DEVXBDEPLQGTZ: ['DE', ['long_term'], 'gplq_gtz-non-de'],
    DEV00DEPI30NQ: ['DE', ['pay_in_1'], 'pi30nq'],
    DEV000DEPI30Q: ['DE', ['pay_in_1'], 'pi30q'],
    DEV0000DEPI30: ['DE', ['pay_in_1'], 'pi30'],
    DEVXBDEPI30NQ: ['DE', ['pay_in_1'], 'pi30nq-non-de'],
    DEV0XBDEPI30Q: ['DE', ['pay_in_1'], 'pi30q-non-de'],
    DEV00XBDEPI30: ['DE', ['pay_in_1'], 'pi30-non-de'],
    DEV0DEGENERIC: ['DE', ['product_list'], 'generic'],
    DEV000XBDEGEN: ['DE', ['product_list'], 'generic-non-de'],
    // Multi product modal
    DEV000DEMULTI: ['DE', ['pay_in_1', 'long_term'], 'pi30'],
    DEV0XBDEMULTI: ['DE', ['pay_in_1', 'long_term'], 'pi30-non-de'],

    DEV000000GBPL: ['GB', ['short_term'], 'pl'],
    DEV00000GBPLQ: ['GB', ['short_term'], 'plq'],

    DEV000000FRPL: ['FR', ['short_term'], 'gpl'],
    DEV00000FRPLQ: ['FR', ['short_term'], 'gplq'],

    DEV000000AUPL: ['AU', ['short_term'], 'gpl'],
    DEV00000AUPLQ: ['AU', ['short_term'], 'gplq'],

    DEV0000ESPLNA: ['ES', ['short_term'], 'short_term_no_amount'],
    DEV00000ESPLQ: ['ES', ['short_term'], 'short_term_q'],
    DEV0000ESPLNQ: ['ES', ['short_term'], 'short_term_nq'],

    DEV0000ITPLNA: ['IT', ['short_term'], 'short_term_no_amount'],
    DEV00000ITPLQ: ['IT', ['short_term'], 'short_term_q'],
    DEV0000ITPLNQ: ['IT', ['short_term'], 'short_term_nq']
};
