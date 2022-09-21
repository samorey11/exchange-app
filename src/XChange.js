import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import arrow from './arrow.jpg';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      amount: 1,
      convert: 'AUD',
      currencies: [],
      // total: '',
      rate: 0
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBaseChange = this.handleBaseChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleConvertChange = this.handleConvertChange.bind(this);
  
  }

  componentDidMount() {
    fetch(`https://altexchangerateapi.herokuapp.com/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({
        currencies: Object.keys(data).map(symbol => ({ symbol, name: data[symbol] })),
      });
      this.handleSubmit();
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  handleBaseChange(event) {
    this.setState({ base: event.target.value }); 
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleConvertChange(event) {
    this.setState({ convert: event.target.value });
  }


  handleSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    const { base, amount, convert, rate } = this.state;
    

    console.log(`base: ${base}\namount: ${amount}\nconvert: ${convert}`);
    
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?from=${base}&to=${convert}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({
        rate: data.rates[convert],
      });
    }).catch((error) => {
      console.log(error);
    })
  }
  
  // convertRate = () => {
  //   const { base, convert } = this.state;

  //   const host = 'api.frankfurter.app';
  //   fetch(`https://${host}/latest?from=${base}&to=${convert}`)
  //   .then(checkStatus)
  //   .then(json)
  //   .then((data) => {
  //     this.setState({
  //       convert: parseFloat(data.rates["${convert}"].rate)
  //     })
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  // conversionTotal = () => {
  //   const { convert, amount } = this.state;
    
  //   const total = (convert * amount).toFixed(2);
  //   this.setState({ 
  //     total
  //   });
  // }



  render () {
    const { currencies, base, amount, rate, convert } = this.state;
    console.log(rate)
    

    return (
      <div className="row">
        <div className="col-4 my-3 ms-5 text-center" id="coin1">
          <div className="row text-center my-3 mx-auto">
            <span>Base Currency:</span>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="text-center mx-auto"style={{width: '50%'}}>
              <select name="base" value={base} onChange={this.handleBaseChange} className="form-control select-menu text-center">
                {this.state.currencies.map(currency => (
                  <option key={currency.symbol} value={currency.symbol}>
                  {currency.symbol} - {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-3 mx-auto text-center">
              <label>
                Amount:
                <input style={{width: '50%'}} type="number" name="amount" value={amount} onChange={this.handleAmountChange} className="my-3 mx-auto form-control" />
              </label>
              
            </div>
            <button type="submit" className="btn btn-primary btn-lg">Convert</button>
          </form>
        </div>
        <div className="col-3 my-auto text-center mx-auto">
          <img src={arrow} />
        </div>
        <div className="col-4 my-3 mx-auto text-center" id="coin2">
          <div className="row text-center my-3 mx-auto">
            <span>Convert to: </span>
          </div>
          <div className="text-center mx-auto" style={{width: '50%'}}>
          <select name="convert" value={convert} onChange={this.handleConvertChange} className="form-control select-menu text-center">
              {this.state.currencies.map(currency => (
                <option key={currency.symbol} value={currency.symbol}>
                {currency.symbol} - {currency.name}
              </option>
              ))}
            </select>
          </div>
          <div className="my-3 mx-auto text-center">
            <span>Total: </span>
          </div>
          <span>${amount * rate}</span>
        </div>
      </div>
      )
  }
}



export default CurrencyConverter;