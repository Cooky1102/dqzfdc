import React from 'react';
import { connect } from 'react-redux';

class Ad extends React.Component {
    render() {
        return (
            <div>
               <img src={this.props.url} alt="" style={{"width": "100%","maxHeight": "1240px"}} /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(Ad);
