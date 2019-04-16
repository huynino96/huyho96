import React from 'react'

export default class Header extends React.Component{

    render(){
        return(
            <div>
                <div className='jumbotron'>
                    <h1 style={mystyle.myheading}>
                    Welcome to my site</h1>
                    <p style={mystyle.mybody}>System to manage online shopping</p>
                 
                </div>
            </div>
        )
    }
}   

const mystyle={
    myheading:{
        color: 'red',
        backgroundColor: 'yellow',
        padding: '5px'
    }, 
    mybody: {
        color: 'blue'
    }
}