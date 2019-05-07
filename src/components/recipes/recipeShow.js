import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const moment = require('moment')



let recipeId = null

function checkPin(value) {
  console.log(value)
  if (value === recipeId) {
    return true
  } else {
    return false
  }
}

let userId = null

function checkLikes(value) {
  console.log('check like value', value)
  if (value === userId) {
    console.log('true')
    return true
  } else {
    console.log('false')
    return false
  }
}

import Auth from '../../lib/auth'

class recipeShow extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {}, user: {} }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleLike = this.handleLike.bind(this)
    // this.handleUnlike = this.handleUnlike.bind(this)

  }

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ recipe: res.data }))
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.setState({ data: res.data.user }))
  }


  handleDelete() {
    axios.delete(`/api/recipes/${this.props.match.params.id}`,
      { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/newsfeed'))
      .catch(err => console.log(err.message))
  }

  isOwner() {
    return Auth.isAuthenticated() && this.state.recipe.user._id === Auth.getPayload().sub
  }

  handleChange({ target: { name, value } }) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: null }
    this.setState({ data, errors })
    console.log(this.state.data)
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post(`/api/recipes/${this.props.match.params.id}/comments`,
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then((res) => {
        if (res.data.errors) {
          this.setState({ sent: 'false' })
        } else {
          document.location.reload(true)
          this.setState({ sent: 'true', data: {} })
        }
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleClick(value, recipe) {
    let data = null
    data = {...this.state.data, pinnedRecipes: recipe.concat(value) }
    this.setState({ data }, function() {
      axios.put(`/api/user/${Auth.getPayload().sub}`,
        this.state.data,
        { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
        .then((res) => {
          if (res.data.errors) {
            this.setState({ sent: 'false' })
          } else {
            this.setState({ sent: 'true' })
          }
        })
        .catch(err => this.setState({ errors: err.response.data.errors }))
    })
  }

  handleLike(value, user) {
    let recipe = null
    recipe = {...this.state.recipe, likes: value.concat(user) }
    this.setState({ recipe }, function() {
      console.log('recipe state -->', this.state.recipe)
      axios.put(`/api/recipes/${this.props.match.params.id}`,
        this.state.recipe,
        { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
        .then((res) => {
          if (res.data.errors) {
            this.setState({ sent: 'false' })
          } else {
            this.setState({ sent: 'true' })
          }
        })
        .catch(err => this.setState({ errors: err.response.data.errors }))
    })
  }

  // handleUnlike(value, user) {
  //   let recipe = null
  //   recipe = {...this.state.recipe, likes: value.concat(user) }
  //   this.setState({ recipe }, function() {
  //     console.log('recipe state -->', this.state.recipe)
  //     axios.put(`/api/recipes/${this.props.match.params.id}`,
  //       this.state.recipe,
  //       { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
  //       .then((res) => {
  //         if (res.data.errors) {
  //           this.setState({ sent: 'false' })
  //         } else {
  //           this.setState({ sent: 'true' })
  //         }
  //       })
  //       .catch(err => this.setState({ errors: err.response.data.errors }))
  //   })
  // }


  render() {
    console.log('state', this.state)
    if(!this.state.recipe) return null
    const { recipe, data, errors } = this.state
    recipeId = this.props.match.params.id
    const { pinnedRecipes } = this.state.data

    if(!this.state.user) return null
    userId = Auth.getPayload().sub
    const { likes } = this.state.recipe

    return(
      <main className="section recipe-page">
        <div className="container margin-maker margin-auto">
          <div className="columns is-vcentered has-background-white margin-topbottom curve-border">
            <div className="column is-half">
              <h2 className="custom-title">{recipe.name}<br /></h2>
            </div>
            <div className="column is-half pin-column">
              {pinnedRecipes && pinnedRecipes.some(checkPin) &&
                <a className="button is-rounded is-pulled-right pin-button">
                  <span className="icon">
                    <i className="fas fa-check-circle"></i>
                  </span>
                  <span>Pinned</span>
                </a>
              }
              {pinnedRecipes && !pinnedRecipes.some(checkPin) &&
                <a className="button is-rounded is-pulled-right pin-button" onClick={() => this.handleClick(pinnedRecipes, [recipe._id])}>
                  <span className="icon">
                    <i className="fas fa-thumbtack"></i>
                  </span>
                  <span>Pin</span>
                </a>
              }
            </div>
          </div>
          <div className="columns is-multiline small-top-margin">
            <div className="column is-one-third no-left-side-padding">
              <div className="extra-padding has-background-white curve-border">
                <figure className="image">
                  <img src={recipe.image} alt={recipe.name} className="curve-border" />
                </figure>
                <br/>
                {this.isOwner() && <a className="button is-warning is-rounded" href={`/recipe/${recipe._id}/edit`}>
                  <span className="icon">
                    <i className="fas fa-pencil-alt"></i>
                  </span>
                  <span>Edit</span>
                </a>}
                {this.isOwner() && <a className="button is-danger is-rounded" onClick={this.handleDelete}>
                  <span className="icon">
                    <i className="fas fa-trash-alt"></i>
                  </span>
                  <span>Delete</span>
                </a>}
                {this.isOwner() && <div><br /></div>}
                Created by <Link to={`/user/${recipe.user._id}`}>{recipe.user.username}</Link><br/><span className="small-font"> on {moment(recipe.createdAt).format('Do MMMM YYYY')} at {moment(recipe.createdAt).format('hh:mm')}</span><br /><br />
                <div>
                  {likes && likes.some(checkLikes) &&
                  <div className="small-margin"><a className="button is-link is-rounded is-small">
                    <span className="icon">
                      <i className="fas fa-check-circle"></i>
                    </span>
                    <span>Liked</span>
                  </a><label className="label totalLikes like-info">{this.state.recipe.likes.length} Likes</label></div>
                  }
                  {likes && !likes.some(checkLikes) &&
                      <div className="small-margin"><a className="button is-link is-rounded is-small" onClick={() => this.handleLike(likes, Auth.getPayload().sub)}>
                        <span className="icon">
                          <i className="fas fa-thumbs-up"></i>
                        </span>
                        <span>Like</span>
                      </a><label className="label totalLikes like-info">{this.state.recipe.likes.length} Likes</label></div>
                  }
                </div>
                <hr />
                <h4 className="title is-5">Description</h4>
                <p>“{recipe.description}”</p>
                <hr />
                <h4 className="title is-4">Categories</h4>
                <div>{recipe.categories.map((category, i) => (
                  <span key={i}>{category.name}, </span>))}</div>
              </div>
            </div>
            <div className="column is-one-third has-text-centered">
              <div className="extra-padding has-background-white curve-border">
                <h4 className="title is-4">Ingredients</h4>
                <p className="p_wrap">{recipe.ingredients}</p>
              </div>
            </div>
            <div className="column is-one-third has-text-centered no-right-side-padding">
              <div className="extra-padding has-background-white curve-border">
                <h4 className="title is-4">Method</h4>
                <p className="p_wrap">{recipe.method}</p>
              </div>
            </div>
            <div className="column is-12 no-side-padding">
              <div className="extra-padding has-background-white curve-border">
                <h4 className="title is-4">Comments</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Make Comment</label>
                    <div className="control">
                      <textarea cols='60' rows='3'
                        className={`textarea text-top is-rounded ${errors.text ? 'is-danger': ''}`}
                        name="text"
                        placeholder="Comment"
                        onChange={this.handleChange}
                        value={data.text || ''}
                      />
                    </div>
                    {errors.restaurantName && <small className="help is-danger">{errors.restaurantName}</small>}
                  </div>
                  <button className="button pin-button is-rounded">Submit</button>
                </form>
                <div>{recipe.comments.map((comment, i) => (
                  <div key={i}><hr /><p>{comment.text}</p><p><strong>Written by {comment.user.username}</strong> on {moment(comment.user.createdAt).format('Do MMMM YYYY')} at {moment(comment.user.createdAt).format('hh:mm')}</p></div>))}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }
}


export default recipeShow
