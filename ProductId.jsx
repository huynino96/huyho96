import React from 'react'

const url = 'http://rmit.chickenkiller.com:8080/products/id'
export default class ProductId extends React.Component {
    constructor() {
        super()
        this.state = {
            productId: [],
            id: '',
            
        }
    }
    fetchProductId() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ productIds: json }))
    }
    componentDidMount() {
        this.fetchProductIds()
    }
    handleDelete(id) {
        if (confirm('Do you want to delete?')) {
            fetch(url + '/' + id, {
                method: 'delete'
            })
                .then(res => this.fetchProductIds())
        }
    }


    handleChange(e) {
        let obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    handleEdit(id, name) {
        this.setState({ id: id, name: name })
    }

    handleAdd() {
        if (this.state.id == '') {
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'post',
                body: JSON.stringify({ name: this.state.name })
            })
                .then(res => this.fetchProductIds())
        }


        else {
            console.log('updated');
            //update
            fetch(url, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'put',
                body: JSON.stringify({ _id: this.state.id, name: this.state.name })
            })
                .then(res => {
                    console.log(res)
                    this.fetchProductIds()
                })
        }


    }
    handleSave() {
        console.log('saved')
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({ name: this.state.name })
        })
            .then(res => this.fetchProductIds())
    }
    handleNew() {
        this.setState({ id: '', name: '' })
    }
    render() {
        return (
            <div>

                <div className="card">
                    <div className="card-header">Product ID</div>
                    <div className="card-body">
                        Product ID:
                        <input type="text" name="id"
                            value={this.state.id}
                            onChange={this.handleChange.bind(this)} />

                        Product Type Name:
                        <input type="text" name="name"
                            value={this.state.name}
                            onChange={this.handleChange.bind(this)} />

                        <button onClick={this.handleAdd.bind(this)}>Save</button>
                        <button onClick={() => this.setState({ id: '', name: '' })}>New</button>
                        <button onClick={this.handleNew.bind(this)}></button>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Product ID List</div>
                    <div className="card-body">
                        {this.state.productId.map(p =>
                            <li>{p._id} |
                    <a onClick={this.handleDelete.bind(this, p._id)}>
                                    Delete</a> |
                    <a onClick={this.handleEdit.bind(this, p._id, p.name)}>
                                    Edit</a>

                            </li>
                        )}
                    </div>

                </div>
            </div>
        )
    }
}