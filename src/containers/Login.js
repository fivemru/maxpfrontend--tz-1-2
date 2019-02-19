import { connect } from 'react-redux';
import { Login } from '../components/Login';
import { onLogout } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  isPending: user.isPending,
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(onLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
