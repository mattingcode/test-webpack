'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.jpg';
import '../../common';
import { a } from './tree-shaking';
import LargeNumber from 'larger-number';

class Search extends React.Component {

    constructor() {
        super(...arguments);
        this.state= {
            Text: null
        }
        console.log(LargeNumber('1', '999'));
    }
    loadComponent() {
        import('./text.js').then((Text) => {
          this.setState({
              Text: Text.default
          })
        });
    }
    render() {
        const { Text } = this.state;
        const funcA = a();
        return <div className="search-text"> 
        Search tex
        {
            Text ? <Text /> : null
        }
        {  funcA }
        <img src={ logo }></img>
        </div>
    }
}
ReactDOM.render( <Search/> ,
    document.getElementById('root')
)