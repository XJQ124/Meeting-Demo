import React, { useState } from "react";
import './Login.css'
import Change from './pictures/change.png'
import { Button, Divider, Drawer, Input, Select, ConfigProvider } from 'antd';
import { CloseOutlined, CaretDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const options = [
  {
    label: '+86 中国大陆',
    value: '+86',
  },
  {
    label: '+1 美国',
    value: '+1',
  },
  {
    label: '+2 加拿大',
    value: '+2',
  },
  {
    label: '+852 中国香港',
    value: '+852',
  },
];
function App() {
  const [phoneError, setPhoneError] = useState(false)
  const verification = () => {
    const phoneNumber = /^1[3456789]\d{9}$/;
    if (!phoneNumber.test(mobile)) {
      setPhoneError(<><ExclamationCircleOutlined /> 请输入正确的11位手机号</>);
    } else {
      setPhoneError(null);
    }
  };
  const [isFocus, setIsFocus] = useState(false)
  const [mobile, setMobile] = useState()
  //开关抽屉的状态
  const [open, setOpen] = useState(false);
  //展示抽屉
  const showDrawer = () => {
    setOpen(true);
  };
  //关闭抽屉
  const onClose = () => {
    setOpen(false);
    
  };
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="picture-background">
        <span className="meetingpd">
          MEETINGPAD
        </span>
        {/* 左边白色椭圆 */}
        <div onClick={toggleDrawer}>
          <span className="rectangle" >
            <span className="plus">
              +
            </span>
            <span className="add">
              添加文件
            </span>
          </span>
        </div>
        <span className="balck-square ">
          <span className="text-square">
            仅支持上传 PDF、图片、视频文件上传单个文件的大小不超过 100 MB同一批次上传文件数量不超过10个
          </span>
        </span>
        <span className="rectangle-right" style={{ zIndex: 99999 }}>
          <img src={Change} alt={'图标'} className="language-change " />
          {/* 外部关闭 */}
          <div className="background" onClick={onClose}>
          </div>
          <Divider type="vertical" style={{ marginRight: 110 }} />
          <div>
            <span className="console" >
              控制台
            </span>
            <span className="registration" onClick={showDrawer}>注册/登陆</span>
          </div>
          {/* 打开抽屉时，出现关闭按钮 */}
          {open && <CloseOutlined style={{ marginLeft: 75 }} onClick={onClose} />}
        </span>
        <Drawer
          mask={false} 
          onClose={onClose}
          open={open}
          width='600px'
          // 关闭自带的默认按钮
          closeIcon={false}
        >
          <div className="drawer">
            <div className="text1-drawer text">登录/注册</div>
            <div className="text2-drawer">可通过手机验证码注册/登录</div>
            <div>
              {/* 手机号码，拼接，如果聚焦，就上移，否则变回来 */}
              <span className={`text-number ${isFocus ? 'text-focus' : 'text-none'} ${phoneError ? 'text-error' : ''}`}>手机号码</span>
              <ConfigProvider theme={{ token: { colorPrimary: '#F0C54F' } }} >
                <Input
                  className={`Input ${phoneError ? 'input-error' : ''}  ${mobile ? 'input-blur' : ''}`}
                  onFocus={() => { setIsFocus(true); setPhoneError(null); }}
                  //有内容时，文字不向下移动
                  onChange={(e) => setMobile(e.target.value)}
                  //检查输入是否非空，空下移，非空，不下移
                  onBlur={() => !!mobile || setIsFocus(false)}
                  prefix={
                      <Select
                        variant="borderless"
                        options={options}
                        width="60"
                        defaultValue='+86'
                        optionLabelProp="value"
                        popupMatchSelectWidth={false}
                        defaultActiveFirstOption='true'
                        suffixIcon={<CaretDownOutlined />}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                      />
                    } >
                </Input>
              </ConfigProvider>
            </div>
            {phoneError && <div className="error-text" >{phoneError}</div>}
            <Button className="Button" onClick={verification}>下一步</Button>
            <div className="text3-drawer">未注册账号自动创建为新账号登录注册均视为已同意 用户协议 和 隐私政策</div>
          </div>
        </Drawer>
        <span className="text-bottom">
          版权投诉 ｜服务协议 ｜ 上海金桥信息股份有限公司 ｜ 沪ICP备2022103850号-1 ｜ 互联网安全备案号35020602002560｜V1.3
        </span>
      </div>
    </>
  );
}
export default App;