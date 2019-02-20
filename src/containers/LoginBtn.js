import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LoginBtn } from '../components/LoginBtn';
import { onLogout } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  isPending: user.isPending
});

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch(onLogout())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginBtn)
);
