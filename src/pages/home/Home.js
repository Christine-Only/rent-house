import React from 'react'
import { Route } from 'react-router-dom'
import Index from './index/Index.js'
import House from './house/House.js'
import News from './news/News.js'
import My from './my/My.js'
import './home.scss'
// 导入TabBar组件
import { TabBar } from 'antd-mobile'

const itemList = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' }
]
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTab: props.location.pathname
    }
  }
  // 父组件在初始渲染时，已经拿到地址栏信息，此时子组件如论怎么点击跳转页面，父组件的selectedTab的值都不会改变，若想改变，必须调用componentDidUpdate钩子函数，来触发selectedTab更新
  componentDidUpdate(prevProps) {
    // console.log(prevProps)
    // console.log(this.props)
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  render() {
    return (
      <div className="home">
        {/* 配置路由规则 */}
        <Route exact path="/home" component={Index} />
        <Route path="/home/house" component={House} />
        <Route path="/home/news" component={News} />
        <Route path="/home/my" component={My} />
        {/* 配置路由链接 */}
        <div className="tab-bar">
          <TabBar
            unselectedTintColor="#888"
            tintColor="#21b97a"
            barTintColor="white"
          >
            {itemList.map(item => (
              <TabBar.Item
                title={item.title}
                key={item.title}
                icon={<i className={`iconfont ${item.icon}`} />}
                selectedIcon={<i className={`iconfont ${item.icon}`} />}
                selected={this.state.selectedTab === item.path}
                onPress={() => {
                  this.props.history.push(item.path)
                }}
                data-seed="logId"
              />
            ))}
          </TabBar>
        </div>
      </div>
    )
  }
}
export default Home
