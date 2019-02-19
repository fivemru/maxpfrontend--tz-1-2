import { connect } from 'react-redux';
import { LoginPage } from '../components/LoginPage';
import { onLogin } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  isPending: user.isPending,
  error: user.error
});

const mapDispatchToProps = dispatch => ({
  onLogin: (login, password) => dispatch(onLogin(login, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
