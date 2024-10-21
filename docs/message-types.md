# Message & Modal Abbreviations by Locale

The following are abbreviations used in reference to various messages and files. Local content files can be found in `content/messages`.

## Messages

### **US (United States)**

| messageType     | PStudio Name                     | File Name                  | Message                                                                         |
| --------------- | -------------------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| GENERIC         | Generic Message                  | generic                    | Pay Later - No Amount Message                                                   |
| PLST_SQ         | Short Term - Q                   | short_term_q               | Pay Later - Pay in 4, Qualifying Purchase                                       |
| PLST_NQ         | Short Term - NQ                  | short_term_nq              | Pay Later - Pay in 4, Non-Qualifying Purchase                                   |
| PLLT_MQ_EZ      | Long Term - MQEZ                 | long_term_multi_eqz        | Pay Later - Pay Monthly, Multiple Qualifying Offers = 0% APR                    |
| PLLT_MQ_GZ      | Long Term - MQGZ                 | long_term_multi_gtz        | Pay Later - Pay Monthly, Multiple Qualifying Offers >0% APR                     |
| PLLT_SQ_EZ      | Long Term - SQEZ                 | long_term_single_eqz       | Pay Later - Pay Monthly, Single Qualifying Offer = 0% APR                       |
| PLLT_SQ_GZ      | Long Term - SQGZ                 | long_term_single_gtz       | Pay Later - Pay Monthly, Single Qualifying Offer >0% APR                        |
| PLLT_NQ_EZ      | Long Term - NQEZ                 | long_term_nq_eqz           | Pay Later - Pay Monthly, Non-Qualifying Offers = 0% APR                         |
| PLLT_NQ_GZ      | Long Term - NQGZ                 | long_term_nq_gtz           | Pay Later - Pay Monthly, Non-Qualifying Offers >0% APR                          |
| PLLT_MQ_EZ_RB   | **TBD** - _Not currently in use_ | long_term_multi_eqz_mixed  | Pay Later - Pay Monthly, Multiple Qualifying Offers with risk-based pricing     |
| PLLT_SQ_EZ_RB   | **TBD** - _Not currently in use_ | long_term_single_eqz_mixed | Pay Later - Pay Monthly, Single Qualifying Offers with risk-based pricing       |
| PPCNI_NQ        | NI                               | ppc_ni_nq                  | PPC - No Interest, Non-Qualifying Purchase                                      |
| PPCNI_SQ        | NIQ                              | ppc_nq_q                   | PPC - No Interest, Qualifying Purchase                                          |
| PPCNI_NQ_XB     | NI NON-US                        | ppc_ni_nq_xb               | No Interest, Non-US, Non-Qualifying Purchase                                    |
| PPCNI_SQ_XB     | NIQ NON-US                       | ppc_ni_q_xb                | No Interest, Non-US, Qualifying Purchase                                        |
| EZP:ANY:EQZ     | Easy Payments - AEZ              | ppc_ezp_nq_eqz             | PPC - Easy Payments, Non-Qualifying with APR equal to zero                      |
| EZP:ANY:GTZ     | Easy Payments - AGZ              | ppc_ezp_nq_gqz             | PPC - Easy Payments, Non-Qualifying with APR greater than zero                  |
| PALA:SINGLE:EQZ | Easy Payments - SEZP             | ppc_ezp_single_eqz         | PayPal Credit - Easy Payments (Pay As Low As), with APR equal to zero           |
| PALA:SINGLE:GTZ | Easy Payments - SGZP             | ppc_ezp_single_gtz         | PayPal Credit - Easy Payments (Pay As Low As), with APR greater than zero       |
| PALA:MULTI:EQZ  | Easy Payments - MEZP             | ppc_ezp_multi_eqz          | PPC - Easy Payments (Pay As Low As), Multiple Offers with APR equal to zero     |
| PALA:MULTI:GTZ  | Easy Payments - MGZP             | ppc_ezp_multi_gtz          | PPC - Easy Payments (Pay As Low As), Multiple Offers with APR greater than zero |

**Note:**

-   "\_XB" means Non-US Merchants with a majority US customer base.

### **DE (Germany)**

| messageType   | PStudio Name                      | File Name       | Message                                                                                      |
| ------------- | --------------------------------- | --------------- | -------------------------------------------------------------------------------------------- |
| PLLT_MQ_EZ_XB | DE Long Term - Q EQZ NON-DE       | gplq_eqz-non-de | Pay Later - Ratenzahlung, Non-DE, Qualifying Purchase, 0% APR                                |
| PLLT_MQ_GZ_XB | DE Long Term - Q GTZ NON-DE       | gplq_gtz-non-de | Pay Later - Ratenzahlung, Non-DE, Qualifying Purchase, >0% APR                               |
| PLLT_MQ_EZ    | DE Long Term - Q EQZ              | gplq_eqz        | Pay Later - Ratenzahlung, Qualifying Purchase, 0% APR                                        |
| PLLT_MQ_GZ    | DE Long Term - Q GTZ              | gplq_gtz        | Pay Later - Ratenzahlung, Non-Qualifying Offers, >0% APR                                     |
| PLP1_SQ_XB    | DE Pay In 1 - Q NON-DE            | pi30q-non-de    | Pay Later - Pay in 1, Non-DE, Qualifying Purchase                                            |
| PIP1_SQ       | DE Pay In 1 - Q                   | pi30q           | Pay Later - Pay in 1, Qualifying Purchase                                                    |
| GENERIC_XB    | DE Generic Message - NON-DE       | generic-non-de  | Pay Later - Non-DE, No Amount Message                                                        |
| GENERIC       | DE Generic Message                | generic         | Pay Later - No Amount Message                                                                |
| PLP1_NQ_XB    | DE Pay In 1 - NQ NON-DE           | pi30nq-non-de   | Pay Later - Pay in 1, Non-DE, Non-Qualifying Purchase                                        |
| PLP1_NQ       | DE Pay In 1 - NQ                  | pi30nq          | Pay Later - Pay in 1, Non-Qualifying Purchase                                                |
| PLLT_NQ_EZ_XB | DE Long Term - NQ EQZ NON-DE      | gpl_eqz-non-de  | Pay Later - Ratenzahlung, Non-DE, Non-Qualifying Purchase, 0% APR                            |
| PLLT_NQ_GZ_XB | DE Long Term - NQ GTZ NON-DE      | gpl_gtz-non-de  | Pay Later - Ratenzahlung, Non-DE, Non-Qualifying Purchase, >0% APR                           |
| PLLT_NQ_EZ    | DE Long Term - NQ EQZ             | gpl_eqz         | Pay Later - Ratenzahlung, Non-Qualifying Purchase, 0% APR                                    |
| PLLT_NQ_EZ    | DE Long Term - NQ GTZ             | gpl_gtz         | Pay Later - Ratenzahlung, Non-Qualifying Purchase, >0% APR                                   |
| PLP1_NQ_XB    | DE Pay In 1 - NQ NON-DE Threshold | pi30-non-de     | Pay Later - Pay in 1, Non-DE, Non-Qualifying Purchase, when DE Ratenzahlung is not available |
| PLP1_NQ       | DE Pay In 1 - NQ Threshold        | pi30            | Pay Later - Pay in 1, Non-Qualifying Purchase, when DE Ratenzahlung is not available         |

**Note:**

-   Ratenzahlung in DE is the long term installments product.
-   "\_XB" means Non-DE Merchants with a majority DE customer base.

### **GB (or UK)**

| messageType | PStudio Name       | File Name | Message                                       |
| ----------- | ------------------ | --------- | --------------------------------------------- |
| PLST_NQ     | GB Short Term - NQ | pl        | Pay Later - Pay in 3, Non-Qualifying Purchase |
| PLST_SQ     | GB Short Term - Q  | plq       | Pay Later - Pay in 3, Qualifying Purchase     |

### **FR (France)**

| messageType | PStudio Name       | File Name | Message                                       |
| ----------- | ------------------ | --------- | --------------------------------------------- |
| PLST_NQ     | FR Short Term - NQ | gpl       | Pay Later - Pay in 4, Non-Qualifying Purchase |
| PLST_SQ     | FR Short Term - Q  | gplq      | Pay Later - Pay in 4, Qualifying Purchase     |

### **AU (Australia)**

| messageType | PStudio Name       | File Name | Message                                       |
| ----------- | ------------------ | --------- | --------------------------------------------- |
| PLST_NQ     | AU Short Term - NQ | gpl       | Pay Later - Pay in 4, Non-Qualifying Purchase |
| PLST_SQ     | AU Short Term - Q  | gplq      | Pay Later - Pay in 4, Qualifying Purchase     |

### **IT (Italy)**

| messageType | PStudio Name       | File Name            | Message                                      |
| ----------- | ------------------ | -------------------- | -------------------------------------------- |
| PLST_NA     | IT Short Term - NA | short_term_no_amount | Pay Later, Pay in 3, No Amount               |
| PLST_SQ     | IT Short Term - Q  | short_term_q         | Pay Later, Pay in 3, Qualifying Purchase     |
| PLST_NQ     | IT Short Term - NQ | short_term_nq        | Pay Later, Pay in 3, Non-Qualifying Purchase |

### **ES (Spain)**

| messageType | PStudio Name       | File Name            | Message                                      |
| ----------- | ------------------ | -------------------- | -------------------------------------------- |
| PLST_NA     | ES Short Term - NA | short_term_no_amount | Pay Later, Pay in 3, No Amount               |
| PLST_SQ     | ES Short Term - Q  | short_term_q         | Pay Later, Pay in 3, Qualifying Purchase     |
| PLST_NQ     | ES Short Term - NQ | short_term_nq        | Pay Later, Pay in 3, Non-Qualifying Purchase |

## Modals

### **US (United States)**

| Product                   | PStudio Name                 | File Name       | Message                                  |
| ------------------------- | ---------------------------- | --------------- | ---------------------------------------- |
| PRODUCT_LIST              | [v2] US Product List Modal   | v2_product_list | Product List, Multi-product              |
| PAY_LATER_SHORT_TERM      | [v2] US Short Term Modal     | v2_short_term   | Pay Later, Pay in 4                      |
| PAY_LATER_LONG_TERM       | [v2] US Long Term Modal      | v2_long_term    | Pay Later, Pay Monthly, Upstream version |
| PAY_LATER_LONG_TERM       | [v2] US Long Term Modal - XO | v2_long_term_xo | Pay Later, Pay Monthly, Checkout version |
| PAYPAL_CREDIT_NO_INTEREST | [v2] US No Interest Modal    | v2_ppc_ni       | PPC, No Interest                         |
| EZP                       | [OLD MODAL] US EZP Modal     | legacy_ppc_ezp  | PPC, Easy Payments                       |
| NI                        | [OLD MODAL] US NI Modal      | legacy_ppc_ni   | PPC, No Interest                         |

### **DE (Germany)**

| Product             | PStudio Name               | File Name    | Message                     |
| ------------------- | -------------------------- | ------------ | --------------------------- |
| PRODUCT_LIST        | [v2] DE Product List Modal | product_list | Product List, Multi-product |
| PAY_LATER_LONG_TERM | [v2] DE Long Term Modal    | long_term    | Pay Later, Ratenzahlung     |
| PAY_LATER_PAY_IN_1  | [v2] DE Pay in 1 Modal     | pay_in_1     | Pay Later, Pay in 1         |

### **GB (or UK)**

| Product              | PStudio Name             | File Name  | Message             |
| -------------------- | ------------------------ | ---------- | ------------------- |
| PAY_LATER_SHORT_TERM | [v2] GB Short Term Modal | short_term | Pay Later, Pay in 3 |

### **FR (France)**

| Product              | PStudio Name             | File Name  | Message             |
| -------------------- | ------------------------ | ---------- | ------------------- |
| PAY_LATER_SHORT_TERM | [v2] FR Short Term Modal | short_term | Pay Later, Pay in 4 |

### **AU (Australia)**

| Product              | PStudio Name             | File Name  | Message             |
| -------------------- | ------------------------ | ---------- | ------------------- |
| PAY_LATER_SHORT_TERM | [v2] AU Short Term Modal | short_term | Pay Later, Pay in 4 |

### **IT (Italy)**

| Product              | PStudio Name             | File Name  | Message             |
| -------------------- | ------------------------ | ---------- | ------------------- |
| PAY_LATER_SHORT_TERM | [v2] IT Short Term Modal | short_term | Pay Later, Pay in 3 |

### **ES (Spain)**

| Product              | PStudio Name             | File Name  | Message             |
| -------------------- | ------------------------ | ---------- | ------------------- |
| PAY_LATER_SHORT_TERM | [v2] ES Short Term Modal | short_term | Pay Later, Pay in 3 |

## Modal Offers

### **US (United States)**

| Product             | PStudio Name           | File Name    | Message                                  |
| ------------------- | ---------------------- | ------------ | ---------------------------------------- |
| PAY_LATER_LONG_TERM | [v2] US Long Term      | v2_long_term | Pay Later, Pay Monthly, Upstream version |
| PAY_LATER_LONG_TERM | [v2] US Long Term - XO | v2_long_term | Pay Later, Pay Monthly, Checkout version |

### **DE (Germany)**

| Product             | PStudio Name      | File Name | Message                                   |
| ------------------- | ----------------- | --------- | ----------------------------------------- |
| PAY_LATER_LONG_TERM | [v2] DE Long Term | long_term | Pay Later, Ratenzahlung, Upstream version |