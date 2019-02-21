import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { App } from '../components/App';
import { authLogin } from '../actions/auth';

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  isPending: auth.isPending
});

const mapDispatchToProps = dispatch => ({
  authLogin: (...args) => dispatch(authLogin(...args))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
