import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import City from './pages/city/City'
import Home from './pages/home/Home.js'
import Map from './pages/map/Map'
import NotFound from './pages/404/NotFound'
import 'antd-mobile/dist/antd-mobile.css'
import './assets/fonts/iconfont.css'
import './index.scss'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/city" component={City} />
            <Route path="/map" component={Map} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
