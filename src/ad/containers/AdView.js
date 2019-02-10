import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { getFromLs } from '../../utils';
import './AdView.css';

const Line = ({ label, value }) => (
  <div className="line">
    <Typography className="caption" variant="subheading" gutterBottom>
      {label}:
    </Typography>
    <Typography component="h2" variant="display1" gutterBottom>
      {value}
    </Typography>
  </div>
);

class AdView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ad:
        getFromLs('adList').find(ad => {
          return ad.id === Number(props.match.params.id);
        }) || {}
    };
  }

  onDelete = () => {
    this.props.history.push(`/delete/${this.props.match.params.id}`);
  };

  render() {
    const { title, description, author, date } = this.state.ad;
    return (
      <div className="adView">
        <Link to="/">
          <Button variant="outlined" className="backButton">
            ← Go back
          </Button>
        </Link>
        <Line label="Title" value={title} />
        <Line label="Description" value={description} />
        <Line label="Author" value={author} />
        <Line label="Сreation date" value={date} />
        {getFromLs('activeUserLogin') === author && (
          <div>
            <Button id="delete" onClick={this.onDelete} variant="outlined">
              Delete
            </Button>
            <Link className="link" to={`/edit/${this.props.match.params.id}`}>
              <Button id="edit" variant="outlined">
                Edit
              </Button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}

export default AdView;
