import {Avatar,Divider} from 'antd'
import '../static/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="https://cdn.jsdelivr.net/gh/wencaizhang/static/avatar.png"  /></div>
      <div className="author-introduction">
        一些介绍
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account" />
        <Avatar size={28} icon="qq"  className="account" />
        <Avatar size={28} icon="wechat"  className="account" />
      </div>
  </div>
  )
}

export default Author;