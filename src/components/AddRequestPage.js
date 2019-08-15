import React from 'react';
import RequestForm from './RequestForm'
import { connect } from 'react-redux'
import { startAddRequest } from '../actions/requests'
import PageHeader from './PageHeader';

export class AddRequestPage extends React.Component {
    addRequest = (request) => {
        this.props.startAddRequest(request)
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <PageHeader
                    pageTitle={"Add Request"}
                />
                <div className="content-container">
                    <RequestForm 
                        onSubmit={this.addRequest}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    startAddRequest: (request) => {dispatch(startAddRequest(request))}
})


export default connect(undefined, mapDispatchToProps)(AddRequestPage);