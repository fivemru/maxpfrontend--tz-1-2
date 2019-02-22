import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NewsPage } from '../components/NewsPage';
import { getNews } from '../actions/news';

const mapStateToProps = ({ news }) => ({
  isPending: news.isPending,
  error: news.error,
  data: news.data
});

export default withRouter(
  connect(
    mapStateToProps,
    { getNews }
  )(NewsPage)
);
