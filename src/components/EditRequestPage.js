import React from 'react';
import { connect } from 'react-redux'
import RequestForm from './RequestForm'
import PageHeader from './PageHeader'
import { startEditRequest, startRemoveRequest } from '../actions/requests'
import RemovalModal from './RemovalModal'


/* What's happening here:
1. We pass down two props to RequestForm.
2. Firstly, we pass down the request info as the 'request' props. We get this info from redux.
In mapStateToProps we get data for the request that matches the ID of the 
URL. Eg. /edit/123 will get request data for the request with ID '123' 
3. Then, like AddRequestPage, we pass down the editRequest action dispatcher
to RequestForm under the 'onSubmit' prop.
4. When a user hits the 'save' button in RequestForm, it triggers onSubmit.
5. In this case, because we're feeding the 'editRequest' action instead of the
'addRequest' action, it triggers the 'editRequest' action when a user clicks the 'save' button.

*/

export class EditRequestPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
    };
    startEditRequest = (request) => {
        this.props.startEditRequest(this.props.request.id, request)
        this.props.history.push('/')
    };
    openModal= () => {
        this.setState({modalIsOpen: true});
    }
    closeModal= () => {
        this.setState({modalIsOpen: false});
    }
    onRemove = (id) => {
        this.setState({modalIsOpen: false});
        this.props.startRemoveRequest(this.props.request.id);
        this.props.history.push('/')
    };
    render() { 
        return (
        <div>
            <PageHeader 
                pageTitle={"View/Edit request"}
            />
            <div className="content-container">
                <RequestForm 
                    onSubmit={this.startEditRequest}
                    request={this.props.request}
                />
            <button
                className="button button--remove"
                onClick={this.openModal}
            >
                Remove request
            </button>
            </div>
            <RemovalModal
                modalIsOpen={this.state.modalIsOpen}
                onRemove={this.onRemove}
                closeModal={this.closeModal}
            />
        </div>
        )
    }
}


// Request form is populated with the expense of the ID that matches
// the ID in URL (eg. /edit/123)
const mapStateToProps = (state, props) => {
    return {
        request: state.requests.find((request) => request.id === props.match.params.id)
    };
};

const mapDispatchToProps = (dispatch) => ({
    startEditRequest: (id, request) => dispatch(startEditRequest(id, request)),
    startRemoveRequest: (id) => dispatch(startRemoveRequest(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditRequestPage);