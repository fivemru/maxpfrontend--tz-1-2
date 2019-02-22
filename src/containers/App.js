import { connect } from 'react-redux';
import { App } from '../components/App';
import { authLogin } from '../actions/auth';

const mapStateToProps = ({ auth }) => ({
  isLogin: auth.isLogin,
  isPending: auth.isPending
});

export default connect(
  mapStateToProps,
  { authLogin }
)(App);
