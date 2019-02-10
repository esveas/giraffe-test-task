import React from 'react';
import { getFromLs, setToLs } from '../../utils';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  button: {
    margin: '30px'
  },
  warning: {
    color: '#f44336',
    paddingTop: '25px'
  }
});

class EditAd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: {},
      isEditMode: false,
      isWarning: false,
      lastAdId: getFromLs('lastAdId') || 0
    };

    const { id } = props.match.params;
    if (id !== undefined) {
      this.state = {
        ad: getFromLs('adList').find(ad => {
          return ad.id === Number(id);
        }),
        isEditMode: true
      };
    }
  }

  onTitleChange = ({ target: { value } }) => {
    this.setState(({ ad }) => ({
      ad: {
        ...ad,
        title: value
      }
    }));
  };
  // linefeed on Enter to description field
  onTitleEnterPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('adDescription').focus();
    }
  };

  onDescriptionChange = ({ target: { value } }) => {
    this.setState(({ ad }) => ({
      ad: {
        ...ad,
        description: value
      }
    }));
  };
  // sign in on Enter in Password field
  onDescriptionEnterPressed = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('createOrEdit').click();
    }
  };

  handleCommonClick = () => {
    const { isEditMode, ad } = this.state;
    const date = new Date().toLocaleString();
    const prevAds = getFromLs('adList');
    if (ad.title && ad.description) {
      const { ads, id } = isEditMode
        ? this.getUpdatedAds(date, prevAds)
        : this.getExtendedAds(date, prevAds);
      setToLs('adList', ads);
      this.props.history.push(`/${id}`);
    } else {
      this.setState({ isWarning: true }, () => {
        setTimeout(() => {
          this.setState({ isWarning: false });
        }, 3000);
      });
    }
  };

  getUpdatedAds = (date, prevAds) => {
    const {
      ad: { id, title, description }
    } = this.state;
    return {
      ads: prevAds.map(ad =>
        ad.id === id
          ? {
              ...ad,
              title,
              description,
              date
            }
          : ad
      ),
      id
    };
  };

  getExtendedAds = (date, prevAds) => {
    const {
      ad: { title, description },
      lastAdId
    } = this.state;
    setToLs(
      'lastAdId',
      getFromLs('lastAdId') === false ? 0 : getFromLs('lastAdId') + 1
    );
    return {
      ads: [
        {
          id: lastAdId,
          title,
          description,
          author: getFromLs('activeUserLogin'),
          date
        },
        ...prevAds
      ],
      id: lastAdId
    };
  };

  render() {
    const { classes } = this.props;
    const {
      ad: { title, description },
      isEditMode,
      isWarning
    } = this.state;
    return (
      <div>
        <Link to="/">
          <Button variant="outlined" className={classes.button}>
            ← Go back
          </Button>
        </Link>

        <form className="addAdForm" noValidate autoComplete="off">
          <TextField
            autoFocus={true}
            value={title}
            id="adTitle"
            label="Title"
            className="addAdTextField"
            margin="normal"
            onChange={this.onTitleChange}
            onKeyPress={this.onTitleEnterPressed}
          />
        </form>
        <form className="addAdForm" noValidate autoComplete="off">
          <TextField
            value={description}
            id="adDescription"
            label="Description"
            className="addAdTextField"
            margin="normal"
            onChange={this.onDescriptionChange}
            onKeyPress={this.onDescriptionEnterPressed}
          />
        </form>

        <Button
          id="createOrEdit"
          onClick={this.handleCommonClick}
          variant="outlined"
          className={classes.button}
        >
          {isEditMode ? 'Save' : 'Create'}
        </Button>
        {isWarning && (
          <Typography className={classes.warning} variant="subheading">
            Tip: all fields must be filled in
          </Typography>
        )}
      </div>
    );
  }
}
EditAd.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditAd);
