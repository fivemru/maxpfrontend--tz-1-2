import { connect } from 'react-redux';
import { ProfilePage } from '../components/ProfilePage';
import { getUserInfo } from '../actions/user';

const mapStateToProps = ({ user }) => ({
  isPending: user.isPending,
  error: user.error,
  user
});

export default connect(
  mapStateToProps,
  { getUserInfo }
)(ProfilePage);
