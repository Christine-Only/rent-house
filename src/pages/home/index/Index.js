import React from 'react'
import { Carousel, Flex } from 'antd-mobile'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Nav1 from 'assets/images/nav-1.png'
import Nav2 from 'assets/images/nav-2.png'
import Nav3 from 'assets/images/nav-3.png'
import Nav4 from 'assets/images/nav-4.png'
import './index.scss'

class Index extends React.Component {
  state = {
    swipers: [],
    imgHeight: 212,
    isLoaded: false
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
  componentDidMount() {
    // 发送ajax请求
    this.getSwipers()
  }

  render() {
    return (
      <div className="index">
        <div className="swiper">
          {/* 加载完成后，才会初始化轮播图 */}
          {this.state.isLoaded && (
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
          )}
        </div>
        <div className="nav">
          <Flex>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav1} alt="" />
                <p>整租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav2} alt="" />
                <p>合租</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/home/house">
                <img src={Nav3} alt="" />
                <p>地图找房</p>
              </Link>
            </Flex.Item>
            <Flex.Item>
              <Link to="/home/rent">
                <img src={Nav4} alt="" />
                <p>去出租</p>
              </Link>
            </Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}
export default Index
