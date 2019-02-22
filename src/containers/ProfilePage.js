import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfilePage } from '../components/ProfilePage';
import { getUserInfo } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  isPending: user.isPending,
  error: user.error,
  user
});

export default withRouter(
  connect(
    mapStateToProps,
    { getUserInfo }
  )(ProfilePage)
);
