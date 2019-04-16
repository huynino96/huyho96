import React from 'react'

const url = 'http://rmit.chickenkiller.com:8080/productTypes'
export default class Product extends React.Component {
    constructor() {
        super()
        this.state = {
            productTypes: [],
            id: '',
            name: ''
        }
    }
    fetchProductTypes() {
        fetch(url)
            .then(res => res.json())
            .then(json => this.setState({ productTypes: json }))
    }
    componentDidMount() {
        this.fetchProductTypes()
    }
    handleDelete(id) {
        if (confirm('Do you want to delete?')) {
            fetch(url + '/' + id, {
                method: 'delete'
            })
                .then(res => this.fetchProductTypes())
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
                .then(res => this.fetchProductTypes())
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
                    this.fetchProductTypes()
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
            .then(res => this.fetchProductTypes())
    }
    handleNew() {
        this.setState({ id: '', name: '' })
    }
    render() {
        return (
            <div>

                <div className="card">
                    <div className="card-header">Product Form</div>
                    <div className="card-body">
                        Product Type Id:
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
                    <div className="card-header">Product Type List</div>
                    <div className="card-body">
                        {this.state.productTypes.map(p =>
                            <li>{p._id} | {p.name} |
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