import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Control from 'components/Control.jsx';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import BlackTheme from 'themes/BlackTheme';

class App extends Component {
    static childContextTypes = {
        muiTheme: PropTypes.object.isRequired
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getMuiTheme(BlackTheme)
        };
    }

    render() {
        return <Control />;
    }
}

export function mapStateToProps(state) { return { ...state } };
export function mapDispatchToProps(dispatch) { return { $dispatch: dispatch } };
export default connect()(App);
