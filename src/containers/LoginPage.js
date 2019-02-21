import { connect } from 'react-redux';
import { LoginPage } from '../components/LoginPage';
import { authLogin } from '../actions/auth';

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  isPending: auth.isPending,
  error: auth.error
});

const mapDispatchToProps = dispatch => ({
  authLogin: (...args) => dispatch(authLogin(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
