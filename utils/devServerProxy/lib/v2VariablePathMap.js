const VARIABLE_PATH_MAP = {
    periodic_payment_count: ['total_payments'],
    max_periodic_payment_count: ['total_payments'],
    'product.max_periodic_payment_count': ['total_payments'],
    'periodic_payment.formatted_value': ['formattedPeriodicPayment', 'formattedMonthlyPayment'],
    'breakdown.periodic_payment.formatted_value': ['formattedPeriodicPayment', 'formattedMonthlyPayment'],
    'transaction_amount.formatted_value': ['formattedTransactionAmount'],
    'min_amount.formatted_value': ['formattedMinAmount'],
    'max_amount.formatted_value': ['formattedMaxAmount'],
    'product.min_amount.formatted_value': ['formattedMinAmount'],
    'product.max_amount.formatted_value': ['formattedMaxAmount'],
    apr: ['apr'],
    nominal_rate: ['nominal_rate']
};

export default VARIABLE_PATH_MAP;
