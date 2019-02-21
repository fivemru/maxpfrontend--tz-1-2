import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfilePage } from '../components/ProfilePage';
import { getUserInfo } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (...args) => dispatch(getUserInfo(...args))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProfilePage)
);
