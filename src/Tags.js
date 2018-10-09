import React, {Component} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SearchPhoto from './searchPhotos'
import LinkButton from './LinkButton'
import {
    BrowserRouter,
    Route
} from 'react-router-dom'
import Explore from "./Explore";
export default class tags extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const tag='/tags/'+this.state.value;
        return (
            <BrowserRouter>
            <div>
                <Form >
                    <FormGroup>

                        <Input type="text" name="tag" id="tagsearch" value={this.state.value} onChange={this.handleChange} placeholder="place your tag" />
                        <LinkButton to={tag}>Search!</LinkButton>
                    </FormGroup>
                </Form>
                <Route path="/tags/:tag" component={SearchPhoto} tag={this.state.value}/>
            </div>
            </BrowserRouter>
        );
}
}