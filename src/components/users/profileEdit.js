import React from 'react'
import axios from 'axios'
import Select from 'react-select'
import Container from '../container'

import * as filestack from 'filestack-js'
const client = filestack.init('AYoVZLJZuQ2GNd6qd87SYz')

class ProfileEdit extends React.Component {
  constructor() {
    super()

    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        name: ''
      },
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.updateState = this.updateState.bind(this)
    this.openModal = this.openModal.bind(this)

  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => {
        return res.data.map(category => ({ value: category._id, label: category.name }))
      })
      .then(categories => this.setState({ categories }))
      .catch(err => console.log(err))
    axios.get(`/api/user/${this.props.match.params.id}`)
      .then(res => this.setState({ data: res.data.user }))
      .catch(err => console.log(err.message))
  }

  handleChange({ target: { name , value }}) {
    const data = {...this.state.data, [name]: value}
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = {...this.state.data, image: this.state.image}
    axios.put(`/api/user/${this.props.match.params.id}`, data)
      .then(() => this.props.history.push(`user/${this.props.match.params.id}/edit`))
      .catch(() => this.setState({ error: 'Invalid Input'}))
  }

  handleSelect(value) {
    let data = null
    data = {...this.state.data, categories: value.map(({ value }) => value) }
    this.setState({ data })
  }

  openModal() {
    const options = {
      fromSources: ['local_file_system','instagram','facebook'],
      accept: ['image/*'],
      transformations: {
        crop: true,
        circle: true,
        rotate: true
      },
      onFileUploadFinished: (file) => {
        this.setState({ image: file.url })
      },
      onFileUploadFailed: (file, error) => {
        console.log('file', file)
        console.log('error', error)
      }
    }
    client.picker(options).open()
  }

  updateState(url){
    console.log('updateState running')
    console.log(url)
  }

  render() {
    console.log(this.state)
    console.log(this.state.error)
    return (
      <main className="section profile-page">
        <div className="container margin-maker">
          <div className="extra-padding has-background-white margin-topbottom curve-border">
            <form onSubmit={this.handleSubmit}>
              <h2 className="title">Edit Profile</h2>
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.username ? 'is-danger': ''}`}
                    name="username"
                    placeholder="Username"
                    value={this.state.data.username}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.username && <small className="help is-danger">{this.state.error.username}</small>}
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.email ? 'is-danger': ''}`}
                    name="email"
                    placeholder="Email"
                    value={this.state.data.email}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.email && <small className="help is-danger">{this.state.error.email}</small>}
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.password ? 'is-danger': ''}`}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.data.password}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.password && <small className="help is-danger">{this.state.error.password}</small>}
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.password ? 'is-danger': ''}`}
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Password Confirmation"
                    value={this.state.data.passwordConfirmation}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.passwordConfirmation && <small className="help is-danger">{this.state.error.passwordConfirmation}</small>}
              </div>
              <div className="field">
                <label className="label">Full Name</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.name ? 'is-danger': ''}`}
                    name="name"
                    placeholder="Full Name"
                    value={this.state.data.name}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.name && <small className="help is-danger">{this.state.error.name}</small>}
              </div>
              <div className="field">
                <label className="label">Location</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.location ? 'is-danger': ''}`}
                    name="location"
                    placeholder="Location"
                    value={this.state.data.location}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.location && <small className="help is-danger">{this.state.error.location}</small>}
              </div>

              <div className="field">
                <label className="label">Bio</label>
                <div className="control">
                  <input
                    className={`input ${this.state.error.bio ? 'is-danger': ''}`}
                    name="bio"
                    placeholder="Bio"
                    value={this.state.data.bio}
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.error.bio && <small className="help is-danger">{this.state.error.bio}</small>}
              </div>

              <div className="field">
                <label className="label">Profile Image</label>
                {!this.state.image ?
                  <Container openModal={this.openModal} className="button is-warning is-rounded" />
                  :
                  <img src={this.state.image}/>
                }
              </div>
              <div className="field">
                <label className="label">Categories</label>
                <div>
                  <Select
                    options={this.state.categories}
                    onChange={this.handleSelect}
                    isMulti
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </div>
              </div>
              <button className="button pin-button is-rounded">Save</button>
            </form>
          </div>
        </div>
      </main>
    )
  }
}

export default ProfileEdit
