import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import Index from './index/Index.js'
import House from './house/House.js'
import News from './news/News.js'
import My from './my/My.js'
import './home.scss'

class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <Route path="/home" component={Index} />
        <Route path="/house" component={House} />
        <Route path="/news" component={News} />
        <Route path="/my" component={My} />

        <div className="nav">
          <ul>
            <li>
              <i className="iconfont icon-ind" />
              <p>
                <NavLink to="/home">首页</NavLink>
              </p>
            </li>
            <li>
              <i className="iconfont icon-house" />
              <p>
                <NavLink to="/house">找房</NavLink>
              </p>
            </li>
            <li>
              <i className="iconfont icon-house" />
              <p>
                <NavLink to="/news">资讯</NavLink>
              </p>
            </li>
            <li>
              <i className="iconfont icon-my" />
              <p>
                <NavLink to="/my">我的</NavLink>
              </p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Home
