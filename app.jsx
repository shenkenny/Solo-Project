import React, { Component } from "react"; 
import { render } from "react-dom";
import { BrowserRouter, Switch, Route, Link, withRouter  } from "react-router-dom";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="router"> 
                    <h1> "We have X at home"</h1>
                    <Switch>
                        <Route
                        exact
                        path="/"
                        component={Categories}
                        />
                        <Route
                        exact
                        path="/addItems"
                        component={AddItems}
                        />
                    </Switch>
                </div>
            </BrowserRouter>
        )
    }
}

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {results: [], category: ''};
        this.getResults = this.getResults.bind(this);
    }
    getResults(name){
        fetch(`/results/${name}`)
            .then(res => res.json())
            .then(res => {
                this.setState((state,props) => { 
                    return {results: res, category: name};
                });
            })
            .catch(err => console.log('Categories.getResults failed'));
    }
    //render a button for each category
    //onclick {getResults}
    //render DisplayResults, pass in array of results from getResults
    render() {
        let categories = ['all','drinks','meat','sauce','snacks','staples','veggies'];
        let buttons = [];
        categories.forEach((el,ind) => {
            buttons.push(<button key={ind} onClick={() => this.getResults(el)}>{el}</button>) 
        })
        return (
            <div> 
                
                <Link to={'/addItems'} className="route-button">
                    <button
                    type="button"
                    className="btnSecondary"
                    >
                    Add Items
                    </button>
                </Link>
                <div className="categories">
                    <p> Categories: </p>
                    {buttons}
                </div>
                <DisplayResults results={this.state.results} getResults={this.getResults} category={this.state.category}/>
            </div>
        )
    }
}

const DisplayResults = ({results, getResults, category}) => {
    // Render table from array of objects....
    // https://stackoverflow.com/questions/45427163/map-over-an-array-of-objects-to-create-a-table-in-reactjs
    // console.log(results);
    // results.state = {results: []}
    //create component if results exists
    let display = [];
    if(results[0]){
        // for each result, create tr,td elements
        results.forEach((el,ind) => {
            let rowId = "row" + ind+1;
            let cellIdOne = "cell" + ind + 1;
            let cellIdTwo = "cell" + ind + 2;
            let cellIdThree = "cell" + ind + 3;
            display.push(
                <tr key={rowId}>
                    <td key={cellIdOne}><RemoveItem name={el.name} getResults={getResults} category={category}/></td>
                    <td key={cellIdTwo}>{el.name}</td>
                    <td key={cellIdThree}>today</td>
                </tr>
            )
        })
        // display = JSON.stringify(results);
    }
    return (
        <div className="results">
            <h1>At Home: </h1>
            <table id="simple-table" className="results-table">
                <tbody>
                    <tr id="row0">
                        <th id="del">Delete</th>
                        <th id="name">Item</th>
                        <th id="date">Date Added</th>
                    </tr>
                    {display}
                </tbody>
            </table>
        </div>
    )
}

const RemoveItem = ({name, getResults, category}) => {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         itemName: this.props.name,
    //         key: ''
    //     };
    //     this.removeItem = this.removeItem.bind(this);
    // }
    const removeItem = (name) => {
        console.log(name);
        fetch(`/removeItem/${name}`)
            .then(res => res.json())
            .then(res => {
                // this.setState((state,props) => { 
                //     return {itemName: ""};
                // });
                getResults(category);
                console.log("success res: ",res)
            })
            .catch(err => {
                console.log("failure state: ",err);
                console.log('removeItem failed')
            });
    }

    return(
        <div className="remove-buttons">
            <button key="1" onClick={() => removeItem(name)}>X</button>
        </div>
    )
}

class AddItems extends Component {
    //accept input, search groceries.db for a matching Name
    //if match, update haveAtHome and set to True
    //if no match, display error message
    constructor(props) {
        super(props);
        this.state = {
            itemName: '',
            message: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }
    
    handleChange(event){
        this.setState({itemName: event.target.value});
    };

    updateItem = (event) => {
        event.preventDefault();
        fetch(`/addItem/${this.state.itemName}`)
            .then(res => res.json())
            .then(res => {
                this.setState((state,props) => { 
                    return {message: res.message, itemName: ''};
                });
                if(this.state.message) alert(this.state.message);
            })
            .catch(err => alert(err));
    };

    render(){
        return (
            <div className="add-items"> 
                <h2> Add Items </h2>
                <Link to={'/'} className="route-button">
                    <button
                    type="button"
                    className="btnSecondary"
                    >
                    back to home
                    </button>
                </Link>
                <form onSubmit={this.updateItem} className="add-form">
                    <label>
                        Item Name:
                        <input type="text" value={this.state.itemName} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

render(<App />, document.querySelector("#root"));