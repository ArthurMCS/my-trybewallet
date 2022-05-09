import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { deleteExpenses } from '../actions/actionWallet';

function TableComponent({ expenses, delExpenses }) {
  return (
    <Table triped bordered hover size="sm" variant="dark">
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => {
          const rate = expense.value * expense.exchangeRates[expense.currency].ask;
          return (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>{expense.exchangeRates[expense.currency].name.split('/', 1)}</td>
              <td>{Number(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
              <td>{rate.toFixed(2)}</td>
              <td>Real</td>
              <td>
                <RiDeleteBin6Line onClick={ () => delExpenses(expense) } />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const mapDispatchToProps = (dispatch) => ({
  delExpenses: (payload) => dispatch(deleteExpenses(payload)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
TableComponent.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(TableComponent);
