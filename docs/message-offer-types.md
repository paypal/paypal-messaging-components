# Message Offer Types

## Abbreviations by Locale

The following are abbreviations used in reference to various messages and files

### US (United States)

| Abbreviation | PStudio Name | File Name       | Message                                                                             |
| ------------ | ------------ | --------------- | ----------------------------------------------------------------------------------- |
| GPL          | GPL          | gpl             | Pay Later                                                                           |
| GPLQ         | GPLQ         | gplq            | Pay Later, Qualifying Purchase                                                      |
| GPLNQ        | GPLNQ        | gplnq           | Pay Later, Non-Qualifying Purchase                                                  |
| NIGPL        | \*           | \*              | Multi Product Modal with Pay Later and No Interest                                  |
| NI           | NI           | ni              | No Interest                                                                         |
| NIQ          | NIQ          | niq             | No Interest, Qualifying Purchase                                                    |
| NINONUS      | NI NON-US    | ni_non-us       | No Interest, Non-US Merchants with a majority US customer base                      |
| NINONUSQ     | NIQ NON-US   | niq_non-us      | No Interest, Qualifying Purchase, Non-US Merchants with a majority US customer base |
| EAZ          | AEZ          | ezp_any_eqz     | Easy Pay, APR equal to zero                                                         |
| EAG          | AGZ          | ezp_any_gqz     | Easy Pay, APR greater than zero                                                     |
| PSZ          | SEZP         | pala_single_eqz | Pay As Low As, APR equal to zero                                                    |
| PSG          | SGZP         | pala_single_gtz | Pay As Low As, APR greater than zero                                                |
| PMZ          | MEZP         | pala_multi_eqz  | Pay As Low As, Multiple Offers Available, APR equal to zero                         |
| PMG          | MGZP         | pala_multi_gtz  | Pay As Low As, Multiple Offers Available, APR greater than zero                     |

\* NIGPL is for local mocking only and has no PStudio message, nor file.

### DE (Germany)

| Abbreviation | PStudio Name | File Name     | Message                              |
| ------------ | ------------ | ------------- | ------------------------------------ |
| IAZ          | AEZ          | inst_any_eqz  | Installments, APR equal to zero      |
| IAG          | AGZ          | inst_any_gtz  | Installments, APR greater than zero  |
| PQAG         | AGZP         | palaq_any_gtz | Pay As Low As, APR greater than zero |
| PQAZ         | AEZP         | palaq_any_eqz | Pay As Low As, APR equal to zero     |

### GB (or UK)

| Abbreviation | PStudio Name | File Name | Message                        |
| ------------ | ------------ | --------- | ------------------------------ |
| GBPL         | Flex         | pl        | Pay Later                      |
| GBPLQ        | Flex Q       | plq       | Pay Later, Qualifying Purchase |

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
