import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { App } from '../components/App';
import { onLogin } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  isPending: user.isPending
});

const mapDispatchToProps = dispatch => ({
  onLogin: (login, password) => dispatch(onLogin(login, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
