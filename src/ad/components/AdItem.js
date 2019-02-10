import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class AdItem extends React.Component {
  render() {
    const {
      ad: { id, title, description, author, date },
      index,
      onDelete,
      isAuthor
    } = this.props;
    return (
      <ul key={'ul' + index}>
        <li>
          {
            <Link className="link" to={`/${id}`}>
              {title}
            </Link>
          }
        </li>
        <li className="wide">{description}</li>
        <li className="narrow">{author}</li>
        <li className="narrow">{date}</li>
        <li className="utils">
          {isAuthor && (
            <div>
              <Button id="delete" onClick={onDelete(id)} variant="outlined">
                Delete
              </Button>
              <Link className="link" to={`/edit/${id}`}>
                <Button id="edit" variant="outlined">
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </li>
      </ul>
    );
  }
}

export default AdItem;
