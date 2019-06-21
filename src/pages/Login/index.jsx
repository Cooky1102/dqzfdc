import React from 'react';
import { connect } from 'react-redux';

// import style from './index.module.scss';

class Login extends React.Component {
    render() {
        return (
            <div>
                <div style={{"height":"1000px"}}>
                login
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
