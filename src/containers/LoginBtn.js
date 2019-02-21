import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginBtn } from '../components/LoginBtn';
import { authLogout } from '../actions/auth';

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  isPending: auth.isPending
});

const mapDispatchToProps = dispatch => ({
  authLogout: () => dispatch(authLogout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginBtn)
);
