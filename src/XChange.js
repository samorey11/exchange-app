import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';



class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: '',
      amount: '',
      convert: '',
      currencies: [],
      result: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    
  }

  componentDidMount() {
    fetch(`https://altexchangerateapi.herokuapp.com/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if(data.Response === 'False') {
        throw new Error(data.Error);
      }

      if(data.Response === 'True') {
        let currencyList = Object.keys(data.code);
        console.log(currencyList);
        this.setState({ 
          currencies: currencyList
        });
      }
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
    event.preventDefault();
    const { base, amount, convert } = this.state;
    //base = base.trim();
    console.log(`base: ${base}\namount: ${amount}\nconvert: ${convert}`);
    
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?from=${base}&to=${convert}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log('json data', data);
    }).catch((error) => {
      console.log(error);
    })
  }
  
  calculateTotal = () => {
    const {base, amount, result, convert } = this.state;
    console.log(`base: ${base}\namount: ${amount}\nconvert: ${convert}`);
    
    if(amount === isNaN) {
      return;
    } else {
      const host = 'api.frankfurter.app';
      fetch(`https://${host}/latest?from=${this.state.base}&to=${this.state.convert}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        const result = (data.rates[this.state.convert] * amount).toFixed(2);
        this.setState({
          result
        });
      });
    
    }
  };

  render () {
    const { currencies, base, amount, convert, result } = this.state;
    

    return (
      <div className="row">
        <div className="col-6 mb-3 text-center">
          <span>Base Currency:</span>
          <form onSubmit={this.handleSubmit} className="form-inline">
            <select name="base" value={base} onChange={this.handleChange} className="form-control select-menu">
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="BGN">BGN - Bulgarian Lev</option>
            </select>
            <label>
              Amount:
              <input type="number" name="amount" value={amount} onChange={this.handleChange} className="form-control" />
            </label>
            <button type="submit" className="btn btn-primary">Convert</button>
          </form>
        </div>
        <div className="col-6 mb-3 text-center">
          <span>Convert to: </span>
          <p>
            <select name="convert" value={convert} onChange={this.handleChange} className="form-control select-menu">
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="BGN">BGN - Bulgarian Lev</option>
            
            </select>
          </p>
          <p>
            <span>Total: </span>
            <span>${amount} * (currencies.rates)</span>
          </p>
        </div>
      </div>
      )
  }
}



export default CurrencyConverter;