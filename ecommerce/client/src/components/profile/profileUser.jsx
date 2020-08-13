import React from 'react';
import {connect} from 'react-redux';

const Profile = ({user}) => {
    console.log(user);

    return(
        <div> User Profile</div>
    )
}

const mapStateToProps = state => {
    return {
        user:state.auth
    }
}
export default connect(mapStateToProps,null)(Profile)