import React, { Component } from 'react';

import Modal from '../../components/UI/Model/Modal';
import Aux from '../Aux/Aux';
const withErrorHandler = (WrappedComponent, axios) => {


    return class extends Component {

        constructor(props) {
            super(props);
            this.state = {
                error: null
            }
        }


        componentDidMount() {
            axios.interceptors.response.use(req => {
                this.setState({ error: null })
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error })
            });
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }


        render() {
            return <Aux>
                <Modal
                    show={this.state.error}
                    modalClosed={this.errorConfirmedHandler}
                >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
        }
    }
}

export default withErrorHandler;