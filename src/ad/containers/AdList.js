import React from 'react';
import { withRouter } from 'react-router-dom';
import { getFromLs } from '../../utils';
import AdListView from '../components/AdListView';

class AdList extends React.Component {
  constructor() {
    super();
    this.state = {
      ads: getFromLs('adList') || []
    };
  }

  onDelete = id => () => {
    this.props.history.push(`/delete/${id}`);
  };

  render() {
    return <AdListView onDelete={this.onDelete} ads={this.state.ads} />;
  }
}

export default withRouter(AdList);
