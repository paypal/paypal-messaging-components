/**
 *
 * @param {*} offers Offers returned from the server.
 * @returns Computed minAmount, maxAmount, belowThreshold, and aboveThreshold values.
 *
 * This function takes in the offers returned from the server and loops over each offer
 * in order to find the absolute min and max amounts from the offers.
 * From the offer with the lowest min amount, the belowThreshold error content is retrieved.
 * Similarly with the offer with the highest max amount, the aboveThreshold error content is retrieved.
 */
export const getComputedVariables = offers =>
    offers.reduce(
        (acc, { meta, content }) => {
            if (meta.minAmount) {
                acc.minAmount = acc.minAmount
                    ? Math.min(acc.minAmount, Number(meta.minAmount))
                    : Number(meta.minAmount);

                if (acc.minAmount === Number(meta.minAmount)) {
                    acc.content.calculator.belowThreshold = content.calculator.belowThreshold;
                }
            }

            if (meta.maxAmount) {
                acc.maxAmount = acc.maxAmount
                    ? Math.max(acc.maxAmount, Number(meta.maxAmount))
                    : Number(meta.maxAmount);

                if (acc.maxAmount === Number(meta.maxAmount)) {
                    acc.content.calculator.aboveThreshold = content.calculator.aboveThreshold;
                }
            }

            return acc;
        },
        {
            content: {
                calculator: {}
            }
        }
    );
