export default {
    DEV00000000NI: ['US', ['ppc_ni'], 'ppc_ni_nq'],
    DEV0000000NIQ: ['US', ['ppc_ni'], 'ppc_ni_q'],
    DEV000NINONUS: ['US', ['ppc_ni'], 'ppc_ni_nq_xb'],
    DEV00NINONUSQ: ['US', ['ppc_ni'], 'ppc_ni_q_xb'],
    DEV0000000EAZ: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_nq_eqz'],
    DEV0000000EAG: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_nq_gtz'],
    DEV0000000PSZ: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_single_eqz'],
    DEV0000000PSG: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_single_gtz'],
    DEV0000000PMZ: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_multi_eqz'],
    DEV0000000PMG: ['US', ['legacy_ppc_ni', 'legacy_ppc_ezp'], 'ppc_ezp_multi_gtz'],
    DEV000000GPLQ: ['US', ['short_term'], 'short_term_q'],
    DEV0000000GPL: ['US', ['short_term'], 'short_term_nq'],
    DEV00000GPLNQ: ['US', ['short_term'], 'short_term_nq'],

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

    // Multi product modal
    DEV00000NIGPL: ['US', ['short_term', 'ppc_ni'], 'short_term_nq'],

    DEV0000000IAZ: ['DE', ['inst'], 'inst_any_eqz'],
    DEV0000000IAG: ['DE', ['inst'], 'inst_any_gtz'],
    DEV000000PQAG: ['DE', ['inst'], 'palaq_any_gtz'],
    DEV000000PQAZ: ['DE', ['inst'], 'palaq_any_eqz'],
    DEV000DEPLEQZ: ['DE', ['gpl'], 'gpl_eqz'],
    DEV000DEPLGTZ: ['DE', ['gpl'], 'gpl_gtz'],
    DEV00DEPLQEQZ: ['DE', ['gpl'], 'gplq_eqz'],
    DEV00DEPLQGTZ: ['DE', ['gpl'], 'gplq_gtz'],
    DEV0XBDEPLEQZ: ['DE', ['gpl'], 'gpl_eqz-non-de'],
    DEV0XBDEPLGTZ: ['DE', ['gpl'], 'gpl_gtz-non-de'],
    DEVXBDEPLQEQZ: ['DE', ['gpl'], 'gplq_eqz-non-de'],
    DEVXBDEPLQGTZ: ['DE', ['gpl'], 'gplq_gtz-non-de'],
    DEV00DEPI30NQ: ['DE', ['pi30'], 'pi30nq'],
    DEV000DEPI30Q: ['DE', ['pi30'], 'pi30q'],
    DEV0000DEPI30: ['DE', ['pi30'], 'pi30'],
    DEVXBDEPI30NQ: ['DE', ['pi30'], 'pi30nq-non-de'],
    DEV0XBDEPI30Q: ['DE', ['pi30'], 'pi30q-non-de'],
    DEV00XBDEPI30: ['DE', ['pi30'], 'pi30-non-de'],
    DEV0DEGENERIC: ['DE', ['product_list'], 'generic'],
    DEV000XBDEGEN: ['DE', ['product_list'], 'generic-non-de'],
    // Multi product modal
    DEV000DEMULTI: ['DE', ['pi30', 'gpl'], 'pi30'],
    DEV0XBDEMULTI: ['DE', ['pi30', 'gpl'], 'pi30-non-de'],

    DEV000000GBPL: ['GB', ['gpl'], 'pl'],
    DEV00000GBPLQ: ['GB', ['gpl'], 'plq'],

    DEV000000FRPL: ['FR', ['gpl'], 'gpl'],
    DEV00000FRPLQ: ['FR', ['gpl'], 'gplq'],

    DEV000000AUPL: ['AU', ['gpl'], 'gpl'],
    DEV00000AUPLQ: ['AU', ['gpl'], 'gplq'],

    DEV0000ESPLNA: ['ES', ['short_term'], 'short_term_no_amount'],
    DEV00000ESPLQ: ['ES', ['short_term'], 'short_term_q'],
    DEV0000ESPLNQ: ['ES', ['short_term'], 'short_term_nq'],

    DEV0000ITPLNA: ['IT', ['short_term'], 'short_term_no_amount'],
    DEV00000ITPLQ: ['IT', ['short_term'], 'short_term_q'],
    DEV0000ITPLNQ: ['IT', ['short_term'], 'short_term_nq']
};
