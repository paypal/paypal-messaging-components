/** @jsx h */
import { h, Fragment } from 'preact';

import Icon from '../../../parts/Icon';

const invalidAmountWarning = terms =>
    terms.maxAmount ? (
        <div style={{ textAlign: 'center', paddingBottom: '15px', display: 'table', paddingTop: '10px' }}>
            <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                <Icon name="info" />
            </span>
            <p
                style={{
                    display: 'inline',
                    fontSize: '13px',
                    color: '#2c2e2f',
                    paddingLeft: '5px',
                    fontFamily: 'PayPalSansSmall',
                    fontWeight: '400'
                }}
            >
                ${terms.maxAmount} is the maximum amount to be eligible for Easy Payments. Enter an amount of $
                {terms.maxAmount} or less.
            </p>
        </div>
    ) : (
        <p style={{ textAlign: 'center' }}>No offers are available for this amount. Please enter a new amount.</p>
    );

const TableContent = ({ terms }) => {
    if (terms.error) {
        return (
            <h3 className="error">
                There was an error retrieving your payment options for this purchase. Please try again later.{' '}
            </h3>
        );
    }

    if (+terms.amount < terms.minAmount && terms.type === 'pala') {
        return (
            <div style={{ textAlign: 'center', paddingBottom: '15px', display: 'table', paddingTop: '10px' }}>
                <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <Icon name="info" />
                </span>
                <p
                    style={{
                        display: 'inline',
                        fontSize: '13px',
                        color: '#2c2e2f',
                        paddingLeft: '5px',
                        fontFamily: 'PayPalSansSmall',
                        fontWeight: '400'
                    }}
                >
                    ${terms.minAmount} is the minimum amount to be eligible for Easy Payments. Enter an amount of $
                    {terms.minAmount} or more.
                </p>
            </div>
        );
    }

    return (
        <Fragment>
            <table className="table">
                <thead>
                    <tr>
                        {terms.type === 'pala' && (
                            <th>
                                Monthly
                                <br />
                                Payments
                            </th>
                        )}
                        <th>Payments</th>
                        <th>
                            Minimum
                            <br />
                            Purchase
                        </th>
                        <th>APR</th>
                        {terms.type === 'pala' && (
                            <th>
                                Total w/
                                <br />
                                Interest
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {terms.offers &&
                        terms.offers.length > 0 &&
                        terms.offers.map(offer => (
                            <tr>
                                {terms.type === 'pala' && (
                                    <td>{offer.monthly && offer.qualified ? `$${offer.monthly}` : ' - '}</td>
                                )}
                                <td>{offer.term}</td>
                                <td>${offer.minValue}</td>
                                <td>{offer.apr}%</td>
                                {terms.type === 'pala' && (
                                    <td>{offer.total && offer.qualified ? `$${offer.total}` : ' - '}</td>
                                )}
                            </tr>
                        ))}
                </tbody>
            </table>
            {(!terms.offers || terms.offers.length === 0) && invalidAmountWarning(terms)}
            <p className="note">These estimates may not include taxes and shipping.</p>
        </Fragment>
    );
};

const TermsTable = ({ terms, isLoading }) => (
    <section className="finance-terms">
        <div className="spinner" style={{ opacity: isLoading ? '1' : '0' }} />
        <div style={{ opacity: isLoading ? '0.5' : '1' }}>
            <TableContent terms={terms} />
        </div>
    </section>
);

export default TermsTable;
