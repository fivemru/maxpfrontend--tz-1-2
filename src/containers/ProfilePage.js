import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ProfilePage } from '../components/ProfilePage';

const mapStateToProps = ({ user }) => ({
  user
});

export default withRouter(connect(mapStateToProps)(ProfilePage));
