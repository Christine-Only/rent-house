import React from 'react'
import { Carousel, Flex, Grid } from 'antd-mobile'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'

const navList = [
  { title: '整租', path: '/home/house', img: Nav1 },
  { title: '合租', path: '/home/house', img: Nav2 },
  { title: '地图找房', path: '/map', img: Nav3 },
  { title: '去出租', path: '/rent', img: Nav4 }
]

class Index extends React.Component {
  state = {
    // 轮播图数据
    swipers: [],
    // 图片默认高度
    imgHeight: 212,
    // 数据加载状态
    isLoaded: false,
    area: 'AREA|88cff55c-aaa4-e2e0',
    // 租房小组信息
    groups: [],
    // 最新资讯
    news: []
  }
  async getSwipers() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    const {
      status,
      data: { body }
    } = res
    if (status === 200) {
      this.setState({
        swipers: body,
        isLoaded: true
      })
    }
  }
  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups', {
      params: {
        area: this.state.area
      }
    })
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        groups: body
      })
    }
  }
  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news', {
      params: {
        area: this.state.area
      }
    })
    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        news: body
      })
    }
  }
  componentDidMount() {
    // 获取轮播图
    this.getSwipers()
    // 获取租房小组信息
    this.getGroups()
    // 获取最新资讯信息
    this.getNews()
  }
  renderSwiper() {
    return (
      this.state.isLoaded && (
        <Carousel autoplay infinite>
          {this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{
                display: 'inline-block',
                width: '100%',
                height: this.state.imgHeight
              }}
            >
              <img
                src={`http://localhost:8080${item.imgSrc}`}
                alt=""
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  window.dispatchEvent(new Event('resize'))
                  this.setState({ imgHeight: 'auto' })
                }}
              />
            </a>
          ))}
        </Carousel>
      )
    )
  }
  renderNav() {
    return (
      <Flex>
        {navList.map(item => (
          <Flex.Item key={item.title}>
            <Link to={item.path}>
              <img src={item.img} alt="" />
              <p>{item.title}</p>
            </Link>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
  renderGroup() {
    return (
      <>
        {/* 标题 */}
        <h3 className="group-title">
          租房小组
          <span className="more">更多</span>
        </h3>
        {/* 内容 */}
        <div className="group-content">
          <Grid
            // data传入的菜单数据
            data={this.state.groups}
            columnNum={2}
            square={false}
            activeStyle
            hasLine={false}
            renderItem={el => (
              <Flex className="group-item" justify="around">
                <div className="desc">
                  <p className="title">{el.title}</p>
                  <span className="info">{el.desc}</span>
                </div>
                <img src={`http://localhost:8080${el.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
      </>
    )
  }
  render() {
    return (
      <div className="index">
        {/* 加载完成后，才会初始化轮播图 */}
        <div className="swiper">
          {this.renderSwiper()}
          {/* 搜索框 */}
          <Flex className="search-box">
            <Flex className="search-form">
              <div className="location">
                <span className="name">上海</span>
                <i className="iconfont icon-arrow"> </i>
              </div>
              <div className="search-input">
                <i className="iconfont icon-seach" />
                <span className="text">请输入小区地址</span>
              </div>
            </Flex>
            {/* 地图小图标 */}
            <i
              className="iconfont icon-map"
              onClick={() => this.props.history.push('/map')}
            />
          </Flex>
        </div>
        {/* 首页导航菜单 */}
        <div className="nav">{this.renderNav()}</div>
        {/* 租房小组 */}
        <div className="group">{this.renderGroup()}</div>
        {/* 最新资讯 */}
        <div className="messages">
          <h3 className="messages-title">最新资讯</h3>
          {this.state.news.map(item => (
            <div className="news-item" key={item.id}>
              <div className="imgwrap">
                <img
                  className="img"
                  src={`http://localhost:8080${item.imgSrc}`}
                  alt=""
                />
              </div>
              <Flex className="content" direction="column" justify="between">
                <h3 className="title">{item.title}</h3>
                <Flex className="info" justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    )
  }
}
export default Index
