'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './search.less';
import logo from './images/logo.jpg';

class Search extends React.Component {
    render() {
        return <div class="search-text"> 
        Search text
        <img src={ logo }></img>
        </div>
    }
}
ReactDOM.render( <Search/> ,
    document.getElementById('root')
)