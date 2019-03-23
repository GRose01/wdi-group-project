import React from 'react'
import axios from 'axios'

import Auth from '../../lib/auth'
import RecipeForm from './recipeForm'

class RecipeNew extends React.Component {
  constructor() {
    super()

    this.state = { data: {}, errors: {}, categories: [] }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentDidMount() {
    axios.get('/api/categories')
      .then(res => {
        return res.data.map(category => ({ value: category._id, label: category.name }))
      })
      .then(categories => this.setState({ categories }))
      .catch(err => console.log(err))
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/recipes',
      this.state.data,
      { headers: {Authorization: `Bearer ${Auth.getToken()}`}})
      .then((res) => {
        if (res.data.errors) {
          this.setState({ sent: 'false' })
        } else {
          this.setState({ sent: 'true', data: {} })
          this.props.history.push('/newsfeed')
        }
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors })
        console.log(err)
      })
  }

  handleSelect(value) {
    const data = {...this.state.data, category: value }
    this.setState({ data })
  }

  render() {
    console.log(this.state)
    return (
      <main className="section">
        <div className="container">
          <RecipeForm
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            handleSelect={this.handleSelect}
            data={this.state.data}
            categories={this.state.categories}
            errors={this.state.errors}
          />
        </div>
      </main>
    )
  }
}

export default RecipeNew
