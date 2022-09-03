import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

const Currency = (props) => {
  const {
    amount,
    base,
    date,
    rates,
  } = props.currency

  return (
    <div className="row">
      <div className="col-6 mb-3">
        <span>Base Currency:</span><select className="base">
          <option value="AUD" selected>AUD</option>
          <option value="BGN">BGN</option>
        </select>
        <span>Amount:</span><input type="number" placeholder="amount in base currency"></input>
      </div>
      <div className="col-6 mb-3">
        <span>Convert to:</span><select className="convert">
          <option value="BGN" selected>BGN</option>
          <option value="BRL">BRL</option>
        </select>
        <span>Total</span>
      </div>
    </div>
  )
}

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: null,
      amount: null,
    };

    
  }


  render () {
    

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            Select Base Currency
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyConverter;