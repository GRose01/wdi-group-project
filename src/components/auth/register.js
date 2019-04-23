import React from 'react'
import axios from 'axios'
import { Animated } from 'react-animated-css'
import Select from 'react-select'
import Container from '../container'
import * as filestack from 'filestack-js'
const client = filestack.init('AYoVZLJZuQ2GNd6qd87SYz')
class Register extends React.Component {
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
  }
  handleChange({ target: { name , value }}) {
    const data = {...this.state.data, [name]: value}
    const error = ''
    this.setState({ data, error })
  }
  handleSubmit(e) {
    e.preventDefault()
    const data = {...this.state.data, image: this.state.image}
    console.log(data)
    if (this.state.data.categories && this.state.data.categories.length > 2) {
      axios.post('api/register', data)
        .then(() => this.props.history.push('/login'))
        .catch(() => this.setState({ error: 'Invalid Input'}))
    }
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
        <div className="input-max container margin-maker margin-auto">
          <div className="input-max extra-padding has-background-white margin-topbottom curve-border">
            <form onSubmit={this.handleSubmit}>
              <h2 className="title">Register</h2>
              <div className="field">
                <label className="label">Username (required)</label>
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
                <label className="label">Email (required)</label>
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
                <label className="label">Password (required)</label>
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
                <label className="label">Password Confirmation (required)</label>
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
                <label className="label">Full Name (required)</label>
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
                <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                  <label className="label">Profile Image</label>
                  {!this.state.image ?
                    <Container openModal={this.openModal} className="button is-warning is-rounded" />
                    :
                    <img src={this.state.image}/>
                  }
                </Animated>
              </div>
              <div className="field">
                <label className="label">Categories (pick at least 3)</label>
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
              <Animated animationIn="bounceInLeft" animationOut="fadeOut" isVisible={true}>
                <button className="button pin-button is-rounded">Register</button>
              </Animated>
            </form>
          </div>
        </div>
      </main>
    )
  }
}
export default Register
