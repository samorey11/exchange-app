import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';

const Currency = (props) => {
  const { amount, base, dates, rates } = props.currency;

  const rate = props.currency.rates;

  return rate;
}





class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      amount: '',
      rates: '',
      conversion: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
  }

  handleChange(event) {
    this.setState({ rates: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let { base } = this.state;
    base = base.trim();
    if (!base) {
      return;
    }

    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=USD&to=EUR`)
    .then((conversion) => {
      if (conversion.ok) {
        return conversion.json();
      }
      throw new Error('Request was either 404 or 500');
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    })
  }


  render () {
    const { baseCurrency, conversion } = this.state;

    return (
      <div className="row">
        <div className="col-6 mb-3 text-center">
          <span>Base Currency:</span>
          <form onSubmit={this.handleSubmit} className="form-inline">
            <select className="base">
              <option value="USD">USD</option>
              <option value="BGN">BGN</option>
            </select>
            <p>
            <span>Amount: </span><input type="number" placeholder="USD" onChange={this.handleChange}></input>
            </p>
            <button type="submit" className="btn btn-primary">Convert</button>
          </form>
        </div>
        <div className="col-6 mb-3 text-center">
          <span>Convert to: </span>
          <p>
            <select className="convert" onChange={this.handleChange}>
              <option value="BGN">BGN</option>
              <option value="BRL">BRL</option>
            </select>
          </p>
          <p>
            <span>Total: </span>
            
            
          </p>
        </div>
      </div>
      )
  }
}



export default CurrencyConverter;