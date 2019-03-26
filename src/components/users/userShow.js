import React from 'react'
import axios from 'axios'
// import User from '../../../controllers/user'
import Auth from '../../lib/auth'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'


class UserShow extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {} }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data }))
  }

  handleSubmit(e) {
    e.preventDefault()
    // User.requestFriend(this.state.data._id, Auth.getPayload().sub)
    //   .then(() => console.log('Request sent'))
  }

  render() {
    // console.log(Auth.getPayload().sub, this.props.match.params.id)
    if(!this.state.data) {
      return null
    } else if (Auth.getPayload().sub === this.props.match.params.id) {
      return (<Redirect to="/profilePage" />)
    } else {
      const { data } = this.state
      return(
        <main className="section">
          <div className="container user-show">
            <div className="columns">
              <div className="column is-half">
                <h2 className="title">{data.username}’s Profile</h2>
              </div>
              <div className="column is-half">
                <button onSubmit={this.handleSubmit} className="button is-info is-rounded is-pulled-right">Request Friend</button>
              </div>
            </div>
            <hr />
            <div className="columns is-multiline">
              <div className="column is-half">
                <figure className="image">
                  <img src={data.image} alt={data.username} />
                </figure>
                <br />
                <h4 className="title is-4">{data.name}</h4>
                <hr />
                <h4 className="title is-4">Location</h4>
                <p>{data.location}</p>
                <hr />
                <h4 className="title is-4">Bio</h4>
                <p>{data.bio}</p>
                <hr />
              </div>
              <div className="column is-half">
                <h4 className="title is-4">Reviews</h4>
                {data.reviews && data.reviews.map((review, i) => (
                  <Link key={i} to={`/review/${review._id}`}><strong>{review.restaurantName}</strong><br />{review.reviewHeadline}<br />{review.rating} Stars<br /><br /></Link>))}
                <hr />
                <h4 className="title is-4">Recipes</h4>
                {data.recipes && data.recipes.map((recipe, i) => (
                  <Link key={i} to={`/review/${recipe._id}`}><strong>{recipe.name}</strong><br />{recipe.description}<br /><br /></Link>))}
              </div>
              <div className="column is-full has-text-centered">
                <h4 className="title is-4">Categories</h4>
                {data.categories && <p>{data.categories.map((category, i) => (
                  <span key={i}>{category.name}, </span>))}
                </p>}
              </div>
            </div>
          </div>
        </main>
      )
    }
  }
}
//tryal
export default UserShow

// <Link className="button is-warning" to={`/reviews/${review._id}/edit`}>Edit</Link>}