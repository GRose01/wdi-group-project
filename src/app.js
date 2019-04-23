import React from 'react'
import ReactDOM from 'react-dom'
import 'bulma'
import './style.scss'
// import Container from './components/Container'

// import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'

import Home from './components/home'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Nav from './components/common/nav'
import Footer from './components/common/footer'
import Newsfeed from './components/users/newsFeed'
import PinnedItems from './components/users/pinnedItems'
import RecipeShow from './components/recipes/recipeShow'
import RecipeNew from './components/recipes/recipeNew'
import RecipeEdit from './components/recipes/recipeEdit'
import ReviewShow from './components/reviews/reviewShow'
import ReviewNew from './components/reviews/reviewNew'
import ReviewEdit from './components/reviews/reviewEdit'
import SecureRoute from './components/common/secureRoute'
import ProfilePage from './components/users/profilePage'
import UserShow from './components/users/userShow'
import ProfileEdit from './components/users/profileEdit'
import Search from './components/search/search'
import ErrorPage from './components/errorPage'
// import axios from 'axios'

class App extends React.Component {
  // componentDidMount() {
  //   axios.get('/api/examples')
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err))
  // }



  render() {
    return (
      <Browser>
        <main>
          <Nav />
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <SecureRoute path="/recipe/new" component={RecipeNew} />
            <SecureRoute path="/recipe/:id/edit" component={RecipeEdit} />
            <SecureRoute path="/recipe/:id" component={RecipeShow} />
            <SecureRoute path="/review/new" component={ReviewNew} />
            <SecureRoute path="/review/:id/edit" component={ReviewEdit} />
            <SecureRoute path="/review/:id" component={ReviewShow} />
            <SecureRoute path="/newsfeed" component={Newsfeed} />
            <SecureRoute path="/pinneditems" component={PinnedItems} />
            <Route exact path="/" component={Home} />
            <SecureRoute path="/profilepage" component={ProfilePage} />
            <SecureRoute path="/user/:id/edit" component={ProfileEdit} />
            <SecureRoute path="/search" component={Search} />
            <Route path="/user/:id" component={UserShow} />
            <Route path="/*" component={ErrorPage} />
          </Switch>
          <Footer />
        </main>
      </Browser>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
