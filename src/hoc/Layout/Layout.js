import React, { Component } from 'react';
import Aux from '../Aux/Aux'
import './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: true
        }
    }


    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false })
    }

    sideDrawerToogleHandler = () => {
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer}
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar sideDrawerToogleHandler={this.sideDrawerToogleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux >
        )
    }
}

export default Layout;