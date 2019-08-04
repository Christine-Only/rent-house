import React from 'react'
import { NavBar } from 'antd-mobile'
import './index.scss'
import Axios from 'axios'
class City extends React.Component {
  state = {
    cityList: []
  }
  formatData(list) {
    const cityObj = {}

    // 对data进行数据的处理
    // 1. 遍历list，得到每一个城市
    // 2. 获取到城市的short的首字母
    // 3. 判断 short的首字母 在对象中是否存在
    // 4. 如果对象中没有这个首字母，  给对象添加一个属性， 值 cityObj['a'] =  [{城市}]
    // 5. 如果对象中已经有了这个首字母，，，只需要往里面push即可
    list.forEach(item => {
      let key = item.short.slice(0, 1)
      if (key in cityObj) {
        cityObj[key].push(item)
      } else {
        cityObj[key] = [item]
      }
    })
    const shortList = Object.keys(cityObj).sort()
    return {
      cityObj,
      shortList
    }
  }
  async getCityList() {
    const res = await Axios.get('http://localhost:8080/area/city?level=1')
    const { status, body } = res.data
    if (status === 200) {
      // this.setState({
      //   cityList: body
      // })
      const { cityObj, shortList } = this.formatData(body)
    }
  }
  // 发送ajax请求获取城市数据
  componentDidMount() {
    this.getCityList()
  }
  render() {
    return (
      <div className="city">
        <NavBar
          mode="light"
          icon={<i className="iconfont icon-back" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          城市选择
        </NavBar>
      </div>
    )
  }
}

export default City
