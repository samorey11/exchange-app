import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { json, checkStatus } from './utils';
import arrow from './arrow.jpg';
import Chart from 'chart.js/auto';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      amount: '1',
      convert: 'AUD',
      currencies: [],
      total: '',
      rate: '1'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBaseChange = this.handleBaseChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleConvertChange = this.handleConvertChange.bind(this);

    this.chartRef = React.createRef();
  
  }

  componentDidMount() {
    const { handleBaseChange, handleConvertChange } = this.state;
    this.convertRate(handleBaseChange, handleConvertChange);
    this.getHistoricalRates(handleBaseChange, handleConvertChange);
    
    fetch(`https://altexchangerateapi.herokuapp.com/currencies`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({
        currencies: Object.keys(data).map(symbol => ({ symbol, name: data[symbol] }))
      });
      this.handleSubmit();
    })
    .catch((error) => {
      this.setState({ error: error.message });
      console.log(error);
    })
  }

  handleBaseChange(event) {
    const base = event.target.value;
    this.setState({ base }); 
    this.convertRate(base, this.state.convert);
    this.getHistoricalRates(base, this.state.convert);
  }

  handleAmountChange(event) {
    this.setState({ amount: event.target.value });
  }

  handleConvertChange(event) {
    const convert = event.target.value;
    this.setState({ convert });
    this.convertRate(convert, this.state.base);
    this.getHistoricalRates(convert, this.state.base);
  }


  handleSubmit(event) {
    if(event) {
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
  
  convertRate = () => {
    const { base, convert } = this.state;

    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?from=${base}&to=${convert}`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      this.setState({
        quote: parseFloat(data.rates[`${convert}`].rate)
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  conversionTotal = () => {
    const { convert, amount } = this.state;
    const total = (convert * amount).toFixed(2);
    this.setState({
      total
    });
  }
  
  getHistoricalRates = () => {
    const { base, convert } = this.state;

    console.log(`${base}`);
    console.log(`${convert}`);
    
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${convert}`)
      .then(checkStatus)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[convert]);
        const chartLabel = `${base}/${convert}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
    .catch(error => console.error(error.message));
  }

  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    })


  }

  render () {
    const { currencies, base, amount, rate, convert } = this.state;
    console.log(`${rate}`);
    

    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-4 my-3 ms-5 text-center" id="coin1">
              <div className="row text-center my-3 mx-auto">
                <span>Base Currency:</span>
              </div>
              <form onChange={this.handleSubmit}>
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
                
              </form>
            </div>
            <div className="col-3 my-auto text-center mx-auto">
              <div className="container-fluid">
                <img src={arrow} />
              </div>
            </div>
            <div className="col-4 my-3 mx-auto text-center" id="coin2">
              <div className="row text-center my-3 mx-auto">
                <span>Convert to: </span>
              </div>
              <div className="text-center mx-auto" style={{width: '50%'}}>
                <form onChange={this.handleSubmit}>
                  <select name="convert" value={convert} onChange={this.handleConvertChange} className="form-control select-menu text-center">
                    {this.state.currencies.map(currency => (
                      <option key={currency.symbol} value={currency.symbol}>
                      {currency.symbol} - {currency.name}
                    </option>
                    ))}
                  </select>
                </form>
              </div>
              <div className="my-3 mx-auto text-center">
                <span>Total: </span>
              </div>
              <span>${amount * rate}</span>
            </div>
          </div>
          <canvas ref={this.chartRef} />
        </div>
      </React.Fragment>
    )
  }
}



export default CurrencyConverter;