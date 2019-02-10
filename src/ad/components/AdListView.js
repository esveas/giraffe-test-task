import React from 'react';

import AdItem from './AdItem';
import { getFromLs } from '../../utils';
import './AdListView.css';

class AdListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      adsPerPage: 5,
      creatorIsUser: false
    };
  }

  handleClick = event => {
    this.setState({
      currentPage: Number(event.target.id)
    });
  };

  render() {
    const { ads, ...props } = this.props;
    const { currentPage, adsPerPage } = this.state;

    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(ads.length / adsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });

    return ads && ads.length ? (
      <div className={'adsPagination'}>
        <ul className="paginationHeader">
          <li>Title</li>
          <li className="wide">Description</li>
          <li className="narrow">Author</li>
          <li className="narrow">Date</li>

          <li className="utils">Utils</li>
        </ul>
        <div>
          {currentAds.map((ad, index) => {
            return (
              <AdItem
                key={index}
                ad={ad}
                index={index}
                isAuthor={getFromLs('activeUserLogin') === ad.author}
                {...props}
              />
            );
          })}
        </div>
        <ul id="page-numbers">{renderPageNumbers}</ul>
      </div>
    ) : (
      ''
    );
  }
}

export default AdListView;
