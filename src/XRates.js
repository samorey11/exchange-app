import React from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import Table from './Table';



class CurrencyRates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      base: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    
    
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
    console.log(`base: ${base}\namount: ${amount}`);
    
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?from=${base}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log('json data', data);
    }).catch((error) => {
      console.log(error);
    })
  }

  getHeadings = () => {
    fetch(`https://altexchangerateapi.herokuapp.com/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      console.log('json data', data);
    })

    return Object.keys(response[0]);
  }

  render () {
    const { amount, base } = this.state;

    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.handleSubmit}>
            <div className="col-6">
              <span>Amount: </span>
              <input type="amount" name="amount" value={amount} onChange={this.handleChange} className="text-center"/>
            </div>
            <div className="col-6">
              <span>Base: </span>
              <select name="base" value={base} onChange={this.handleChange} className="text-center">
                <option value="">Choose a base currency</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="BGN">BGN - Bulgarian Lev</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Convert</button>
          </form>
        </div>
        <div className="row">
          <div className="col-12 text-center my-4">
            <Table theadData={this.getHeadings()} tbodyData={data}/>
          </div>
        </div>
      </div>
    )
  }
}

export default CurrencyRates;