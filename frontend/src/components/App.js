import React, {Component} from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";
import ResultPage from "./ResultPage";
import AnalysisPage from "./AnalysisPage";
import { BrowserRouter as Router, Switch, Route, Link, Redirect} from "react-router-dom";

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (<Router>
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/result' component={ResultPage} />
                <Route path='/analysis' component={AnalysisPage} />
            </Switch>
        </Router>);
    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);