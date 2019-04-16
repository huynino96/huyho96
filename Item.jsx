import React from 'react'

export default class Item extends React.Component{
    render(){

        return(
            <div>
                Item: {this.props.match.params.itemName}
            </div>
        )
    }
}