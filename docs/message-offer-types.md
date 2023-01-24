# Message Offer Types

## Abbreviations by Locale

The following are abbreviations used in reference to various messages and files

Offer Type (or `offerType` as seen in the `banners/` directory JSON files), is the same as the file name, but it is uppercased and uses a colon in place of the underscore. As an example, the file name `ezp_any_eqz` becomes the offer type `EZP:ANY:EQZ`.

### US (United States)

| Abbreviation | PStudio Name         | File Name       | Message                                                                                                                                                        |
| ------------ | -------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GPL          | GPL                  | gpl             | Pay Later, No Amount Experiment                                                                                                                                |
| GPLQ         | GPLQ                 | gplq            | Pay Later, Qualifying Purchase                                                                                                                                 |
| GPLNQ        | GPLNQ                | gplnq           | Pay Later, Non-Qualifying Purchase                                                                                                                             |
| GPLNQ_RANGE  | GPLNQ Purchase Range | gplnq_range     | Pay Later, Non-Qualifying message showing the min and max purchase range. This message is limited to merchant accounts added to the appropriate customer list. |
| NIGPL        | \*                   | \*              | Multi Product Modal with Pay Later and No Interest                                                                                                             |
| NI           | NI                   | ni              | No Interest                                                                                                                                                    |
| NIQ          | NIQ                  | niq             | No Interest, Qualifying Purchase                                                                                                                               |
| NINONUS      | NI NON-US            | ni_non-us       | No Interest, Non-US Merchants with a majority US customer base                                                                                                 |
| NINONUSQ     | NIQ NON-US           | niq_non-us      | No Interest, Qualifying Purchase, Non-US Merchants with a majority US customer base                                                                            |
| EAZ          | AEZ                  | ezp_any_eqz     | Easy Pay, APR equal to zero                                                                                                                                    |
| EAG          | AGZ                  | ezp_any_gqz     | Easy Pay, APR greater than zero                                                                                                                                |
| PSZ          | SEZP                 | pala_single_eqz | Pay As Low As, APR equal to zero                                                                                                                               |
| PSG          | SGZP                 | pala_single_gtz | Pay As Low As, APR greater than zero                                                                                                                           |
| PMZ          | MEZP                 | pala_multi_eqz  | Pay As Low As, Multiple Offers Available, APR equal to zero                                                                                                    |
| PMG          | MGZP                 | pala_multi_gtz  | Pay As Low As, Multiple Offers Available, APR greater than zero                                                                                                |

\* NIGPL is for local mocking only and has no PStudio message, nor file.

### DE (Germany)

| Abbreviation | PStudio Name | File Name | Message |
| ------------ | --------------- | --------------- | ------------------------------------------------------------------------------------------ | |
| DEPLEQZ | GPL EQZ | gpl_eqz | Pay Later, APR equal to zero |
| DEPLGTZ | GPL GTZ | gpl_gtz | Pay Later, APR greater than zero |
| DEPLQEQZ | GPLQ EQZ | gplq_eqz | Pay Later, Qual., APR equal to zero |
| DEPLQGTZ | GPLQ GTZ | gplq_gtz | Pay Later, Qual., APR greater than zero |
| XBDEPLEQZ | GPL EQZ NON-DE | gpl_eqz-non-de | Pay Later, APR equal to zero, Non-DE Merchants with a majority DE customer base |
| XBDEPLGTZ | GPL GTZ NON-DE | gpl_gtz-non-de | Pay Later, APR greater than zero, Non-DE Merchants with a majority DE customer base |
| XBDEPLQEQZ | GPLQ EQZ NON-DE | gplq_eqz-non-de | Pay Later, Qual., APR equal to zero, Non-DE Merchants with a majority DE customer base |
| XBDEPLQGTZ | GPLQ GTZ NON-DE | gplq_gtz-non-de | Pay Later, Qual., APR greater than zero, Non-DE Merchants with a majority DE customer base |

### GB (or UK)

| Abbreviation | PStudio Name | File Name | Message                        |
| ------------ | ------------ | --------- | ------------------------------ |
| GBPL         | Flex         | pl        | Pay Later                      |
| GBPLQ        | Flex Q       | plq       | Pay Later, Qualifying Purchase |

### FR (France)

| Abbreviation | PStudio Name | File Name | Message                        |
| ------------ | ------------ | --------- | ------------------------------ |
| FRPL         | GPL          | gpl       | Pay Later                      |
| FRPLQ        | GPLQ         | gplq      | Pay Later, Qualifying Purchase |

### AU (Australia)

| Abbreviation | PStudio Name | File Name | Message                        |
| ------------ | ------------ | --------- | ------------------------------ |
| AUPL         | AU GPL       | gpl       | Pay Later                      |
| AUPLQ        | AU GPLQ      | gplq      | Pay Later, Qualifying Purchase |

### IT (Italy)

| Abbreviation | PStudio Name     | File Name            | Message                                        |
| ------------ | ---------------- | -------------------- | ---------------------------------------------- |
| ITPLNA       | IT Short Term NA | short_term_no_amount | Pay Later, Short Term, No Amount               |
| ITPLQ        | IT Short Term Q  | short_term_q         | Pay Later, Short Term, Qualifying Purchase     |
| ITPLNQ       | IT Short Term NQ | short_term_nq        | Pay Later, Short Term, Non-Qualifying Purchase |

## Explanation

### Abbreviation Column

-   NI, NIQ, NINONUS, NINONUSQ
    -   NI is for No Interest
    -   Q is for Qualifying
    -   NONUS is for Non-US
-   PSZ, PSG, PMZ, PMG
    -   P is for PALA
    -   S is for Single
    -   M is for Multi
    -   Z is for equal to Zero
    -   G is for Greater than zero
-   EAZ, EAG
    -   E is for Easy Pay
    -   A is for Any
    -   Z is for equal to Zero
    -   G is for Greater than zero
-   AEZ, AGZ, AEZP, AGZP
    -   A is for Any
    -   EZ is for Equal to Zero
    -   GZ is for Greater than Zero
    -   P is for PALA

### PStudio Name Column

For PStudio Names, the above explanations apply except that

-   Z is now EZ for Equal to Zero
-   G is now GZ for Greater than Zero
-   Flex was a previously used name for UK/GB's version of Pay Later
