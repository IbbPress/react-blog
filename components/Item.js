
import { Row, Col, List, Icon } from "antd";
import Marked from '../components/tool/Marked.js'
import dayjs from 'dayjs'

const Item = (props) => (
  <div className="post-item">
    <div className="list-title">
      <a href={`/detail?id=${props.item.id}`}>{props.item.title}</a>
    </div>
    <div className="list-icon">
      <span><Icon type="calendar" />{ dayjs.unix(props.item.add_time).format('YYYY-MM-DD') }</span>
      <span><Icon type="folder" /> 视频教程</span>
      <span><Icon type="fire" /> {props.item.view_count}人</span>
    </div>
    <div
      className="list-context"
      dangerouslySetInnerHTML={{ __html: Marked(props.item.introduce)}}
    />
  </div>
)

export default Item;