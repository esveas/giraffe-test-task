import React from 'react';
import { withRouter } from 'react-router-dom';

import { getFromLs, setToLs } from '../../utils';

class DeleteAd extends React.Component {
  componentDidMount() {
    const {
      history,
      match: {
        params: { id }
      }
    } = this.props;
    setToLs(
      'adList',
      getFromLs('adList').filter(ad => {
        return ad.id !== Number(id);
      })
    );
    history.push('/');
  }

  render() {
    return <div />;
  }
}

export default withRouter(DeleteAd);
