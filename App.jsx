import React from 'react'
import Hello from './Hello.jsx'
import Header from './Header.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import Product from './Product.jsx';
import Item from './Item.jsx';
import Course from './Course.jsx';
import ProductId from './ProductId.jsx'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <BrowserRouter>
                    <ul>
                        <li><Link to={'/'}>Home</Link></li>
                        <li><Link to={'/Login'}>Login</Link></li>
                        <li><Link to={'/Product'}>Product</Link></li>
                        <li><Link to={'/ProductId'}>Product ID</Link></li>

                      
                    </ul>

                    <Route exact path='/' render={() => <h1>Home</h1>} />
                    <Route exact path='/Login' render={() => <h1>Login</h1>} />
                    <Route exact path='/Product' component={() =>
                        <div>
                            <h1>Product</h1>
                            <Product />
                        </div>
                    } />

                    <Route exact path='/ProductId' component={() =>
                        <div>
                            <h1>Product ID</h1>
                            <ProductId />
                        </div>
                    } />


                   


                </BrowserRouter>
            </div>
        )
    }
}