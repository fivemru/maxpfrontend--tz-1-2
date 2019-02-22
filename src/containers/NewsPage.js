import { connect } from 'react-redux';
import { NewsPage } from '../components/NewsPage';
import { getNews } from '../actions/news';

const mapStateToProps = ({ news }) => ({
  isPending: news.isPending,
  error: news.error,
  data: news.data
});

export default connect(
  mapStateToProps,
  { getNews }
)(NewsPage);
