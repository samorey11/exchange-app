import React, { useDebugValue } from 'react';
import { json, checkStatus } from './utils';

class XChange extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rate: null,
      usd: 1, 
      eur: 1 * 0.89,
    };
  }

  componentDidMount () {
    fetch(`https://api.frakfurter.app/lastest`)
    .then(checkStatus)
    .then(json)
    .then((data) => {
      if (data.Response === 'False') {
        throw new Error(data.Error);
      }

      
    })
  }

}