import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import HighlightsList from './HighlightsList.jsx';
import ReviewsCounter from './ReviewsCounter.jsx';
import ReviewsSearch from './ReviewsSearch.jsx';
import ReviewsList from './ReviewsList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: 6,
      avgRating: 0,
      totalReviews: 0,
      reviews: [],
      searchPerformed: false,
      searchResults: [],
      currentPageOfReviews: [],
      activePage: 1
    };
    this.setAppState = this.setAppState.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.setSearchPerformed = this.setSearchPerformed.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.calculateAvgRating = this.calculateAvgRating.bind(this);
    this.scrollToReviewsList = this.scrollToReviewsList.bind(this);
  }

  setAppState(property, data) {
    this.setState({
      [property]: data
    });
  }

  setSearchPerformed() {
    if (this.state.searchPerformed === false) {
      this.setState({
        searchPerformed: true
      });
    }
  }

  clearFilters() {
    this.setState({
      searchPerformed: false
    });
  }

  getReviews() {
    axios
      .get(`/reviews/${this.state.productId}`)
      .then((data)=>{
        this.setState({
          reviews: data.data,
          currentPageOfReviews: data.data.slice(0, 10),
          activePage: 1
        });
      })
      .then(()=>{
        this.calculateTotalReviews();
        this.calculateAvgRating();
      })
      .catch((err)=>{
        console.error(err);
      });
  }

  calculateTotalReviews() {
    this.setState((state, props)=>({
      totalReviews: this.state.reviews.length
    }));
  }

  calculateAvgRating() {
    //iterate over each review and extract the rating value, add them together, then divide by the totalReviews
    let total = this.state.reviews.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
    // console.log(total);
    let avgRating = (total / this.state.reviews.length).toPrecision(2);
    // console.log(avgRating);
    this.setState({
      avgRating: parseFloat(avgRating)
    });
  }

  scrollToReviewsList() {
    let position = $('#scrollTop').offset();
    $('html, body').animate({ scrollTop: (position.top - 130)}, 1000);
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    return (
      <div>
        <div className='main-wrapper'>
          <div className='gutter-left'></div>
          <div className='productImage'></div>
          <div className='productHighlights-wrapper'>
            <div className='productDetail'></div>
            <HighlightsList totalReviews={this.state.totalReviews} reviews={this.state.reviews.slice(0, 3)} scrollToReviewsList={this.scrollToReviewsList}/>
          </div>
        </div>
        <div className='reviews-wrapper'>
          <ReviewsCounter totalReviews={this.state.totalReviews} avgRating={this.state.avgRating}/>
          <ReviewsSearch productId={this.state.productId} reviews={this.state.reviews} setAppState={this.setAppState} setSearchPerformed={this.setSearchPerformed} calculateTotalReviews={this.calculateTotalReviews} calculateAvgRating={this.calculateAvgRating}/>
          <ReviewsList reviews={this.state.reviews} searchResults={this.state.searchResults} searchPerformed={this.state.searchPerformed} currentPageOfReviews={this.state.currentPageOfReviews} activePage={this.state.activePage} setAppState={this.setAppState} scrollToReviewsList={this.scrollToReviewsList}/>
        </div>
      </div>
    );
  }
}
export default App;