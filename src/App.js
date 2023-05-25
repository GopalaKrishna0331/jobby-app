import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import jobs from './components/Jobs'
import JobItemDetails from './components/JobItemDetails'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
      <Route component={PageNotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
