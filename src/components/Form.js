import React from 'react';

export default function Form() {
  return (
    <Form>
      <Form.Label htmlFor="value-input">
        Valor:
      </Form.Label>
      <Form.Control
        type="number"
        name="value"
        data-testid="value-input"
        onChange={ this.handleChange }
        value={ value }
      />
      <Form.Label htmlFor="description-input">
        Descrição:
      </Form.Label>
      <Form.Control
        type="text"
        name="description"
        data-testid="description-input"
        onChange={ this.handleChange }
        value={ description }
      />
      {this.renderSelects()}
    </Form>
  );
}
