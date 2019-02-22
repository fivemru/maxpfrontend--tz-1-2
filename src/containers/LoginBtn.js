import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginBtn } from '../components/LoginBtn';
import { authLogout } from '../actions/auth';

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  isPending: auth.isPending
});

export default withRouter(
  connect(
    mapStateToProps,
    { authLogout }
  )(LoginBtn)
);
