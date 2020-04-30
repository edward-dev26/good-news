import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfile, updateUserProfile} from "../../redux/profile-reducer";
import {change, submit} from "redux-form";
import ModalDialog from "../common/Modal/ModalDialog";
import {compose} from "redux";
import {withFixedFooter} from "../../hoc/withFixedFooter";

class ProfileContainer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            changedProperty: null
        }
    }

    componentDidMount() {
        this.props.getUserProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.isAuth && this.props.isAuth !== prevProps.isAuth && !this.props.user) {
            this.props.getUserProfile();
        }
    }

    confirmChanges = (data) => {
        this.setState({...this.state, isModal: true, changedProperty: data});
    };

    closeModal = () => {
        this.setState({...this.state, isModal: false, changedProperty: null});
    };

    updateProfile = () => {
        this.props.updateUserProfile(this.state.changedProperty);
        this.closeModal();
    };

    render() {
        return (
            <>
                <ModalDialog
                    isShow={this.state.isModal}
                    title='Confirm changes'
                    body={'Do you want to save changes?'}
                    closeModal={this.closeModal}
                    updateProfile={this.updateProfile}
                />
                {this.props.user && <Profile
                    user={this.props.user}
                    region={this.props.region}
                    confirmChanges={this.confirmChanges}
                    changeReduxForm={this.props.change}
                    startSubmit={this.props.submit}
                />}
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        user: state.profile.user,
        region: state.app.region
    }
};

export default compose(
    connect(mapStateToProps, {getUserProfile, updateUserProfile, change, submit}),
    withFixedFooter
)(ProfileContainer);
