import React from 'react'
import './index.scss'

class Map extends React.Component {
  render() {
    return (
      <div className="map">
        {/* {navigator.geolocation.getCurrentPosition(position =>
          // position.coords表示当前的地理位置信息
          // 常用：
          // latitude 纬度
          // longitude 经度
          // {lng: 121.61887341233741, lat: 31.040603951746952}
          console.log(position)
        )} */}
        <div id="container" />
      </div>
    )
  }
  componentDidMount() {
    const BMap = window.BMap
    // 创建地图实例
    const map = new BMap.Map('container')
    // 创建点坐标
    const point = new BMap.Point(121.61887341233741, 31.040603951746952)
    // 初始化地图，设置中心点坐标和地图级别
    map.centerAndZoom(point, 18)
    const myCity = new BMap.LocalCity()
    myCity.get(result => {
      let cityName = result.name
      map.setCenter(cityName)
      alert('当前定位城市:' + cityName)
    })
  }
}

export default Map
