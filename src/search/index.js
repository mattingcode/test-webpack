'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.jpg';
import '../../common';

class Search extends React.Component {
    render() {
        return <div className="search-text"> 
        Search tex
        <img src={ logo }></img>
        </div>
    }
}
ReactDOM.render( <Search/> ,
    document.getElementById('root')
)