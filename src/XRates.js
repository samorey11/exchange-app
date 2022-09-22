import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import "./index.css";

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      amount: '1',
      convert: '',
      rate: '',
      currenciesList: [],
      result: '',
      conversions: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    
    fetch(`https://altexchangerateapi.herokuapp.com/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({
        currenciesList: Object.keys(data).map(symbol => ({ symbol, name: data[symbol] }))
      });
      this.handleSubmit();
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })

  }

  handleChange(event) {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value
    }); 
  }

  handleSubmit(event) {
    if(event) {
      event.preventDefault();
    }
    const { base, rate, amount } = this.state;
    console.log(`base: ${base}\namount: ${amount}`);
    
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?from=${base}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log('json data', data);
      this.setState({
        conversions: Object.keys(data.rates).map(symbol => ({symbol, rate: data.rates[symbol]}))
      })
    }).catch((error) => {
      console.log(error);
    })
  }
  
  render () {
    const { currency, base, amount, convert, result, rate, conversions } = this.state;
    
    return (
      <div className="row">
        <div className="row mx-auto" id="xrates">
          <div className="col-6 mb-3 my-3 text-center">
            <form onSubmit={this.handleSubmit} className="form-inline">
              <div className="my-2">
                <label>
                  Amount:
                  <input type="number" name="amount" value={amount} onChange={this.handleChange} className="form-control my-3" />
                </label>
              </div> 
              <button type="submit" className="btn btn-primary" id="button">Convert</button>
            </form>
            
          </div>
          <div className="col-6 mb-3 my-3 text-center">
            <span>Base Currency: </span>
            <div className="text-center mx-auto my-2"style={{width: '50%'}}>
            <select name="base" value={base} onChange={this.handleChange} className="form-control select-menu text-center">
                {this.state.currenciesList.map(currency => (
                  <option key={currency.symbol} value={currency.symbol}>
                  {currency.symbol} - {currency.name}
                </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12 mb-3 text-center">
            <div className="my-2" id="xrates-table">
              <span>Conversion Table</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {conversions.map((currency) => (
                  <tr key={currency.symbol}>
                    <td>{currency.symbol}</td>
                    <td>{amount * currency.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    )
  }
}



export default CurrencyConverter;