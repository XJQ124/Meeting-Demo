import React, { useEffect, useState } from "react";
import '../LoginPage.css'
import Change from '../pictures/change.png'
import { Button, Divider, Drawer, Input, Select, ConfigProvider, Upload, Checkbox, notification } from 'antd';
import { CloseOutlined, CaretDownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Pdf } from '../utills/icons'
import { Image } from '../utills/icons'
import { Video } from '../utills/icons'
import _ from "lodash";
import { formatFileSize } from "../utills/computation";
import { DemoLiquid } from "./Liquid";
import '../Liquid.css'
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
function LoginPage() {
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
    //切换抽屉
    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };
    //选择文件的状态
    const [selectedFiles, setSelectedFiles] = useState([]);
    // 展示文件列表
    const [showFileBox, setShowFileBox] = useState(false);
    // 左侧中间展示信息的状态
    const [showInfo, setShowInfo] = useState(true);
    const [showBoxInside, setshowBoxInside] = useState(false);
    //选中了文件的个数
    const [fileCount, setFileCount] = useState(0);
    useEffect(()=>{
        setFileCount(selectedFiles.length)
    },[selectedFiles]);


    // const savedfiles =()=>{
    //     return selectedFiles.length;
    // }
    let notificationShow = [false]
    //上传事件
    const handleUploadChange = (info) => {
        if (info.file === info.fileList[0]) {
            //获取已保存的文件
            let savedFiles = [...selectedFiles];
            //获取新增的文件列表，这里的fileList是Upload的属性
            let newFiles = [...info.fileList];
            // 检查是否有文件超过100MB
            const OverLimit = newFiles.some(newFile => newFile.size > 100 * 1024 * 1024);

            if (OverLimit && notificationShow) {
                // 文件违反上传规则，显示通知
                notification.open({
                    description: `文件违反了上传规则，请重新上传`,
                    placement: 'bottomLeft',
                    style: {
                        width: 370,
                        fontWeight: "bold",
                        backgroundColor: 'rgba(240, 197, 79, 1)',
                    },
                });
                notificationShow = true;
                return;
            } else {
                // 允许上传整个文件批次
                newFiles.forEach(newFile => {
                    //去重
                    const isDuplicate = _.some(savedFiles, { 'name': newFile.name });
                    if (!isDuplicate) {
                        savedFiles = _.concat(savedFiles, newFile);
                    }
                });
            }
            // 个数限制
            if (savedFiles.length > 10) {
                savedFiles = savedFiles.slice(-10)
            }
            setSelectedFiles(savedFiles);
            setShowFileBox(true);
            setShowInfo(false); // 文件选择后隐藏 rectangle
        }
    }
    // 获取文件总大小
    const getTotalFileSize = () => {
        let totalSize = 0;
        selectedFiles.forEach(file => {
            totalSize += file.size;
        });
        // 使用 formatFileSize 方法格式化文件大小
        const totalSizeStr = formatFileSize(totalSize);
        return totalSizeStr;
    };
    const [isHovered, setIsHovered] = useState(null);
    const handleMouseEnter = (index) => {
        setIsHovered(index);
    };
    const handleMouseLeave = () => {
        setIsHovered(null);
    };
    const handleDeleteFile = (index) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
        // 当删除到最后一个的时候，出现rectangle框
        if (updatedFiles.length === 0) {
            setShowFileBox(false);
            setShowInfo(true);
            // let closeInfo = document.querySelector(".file-box")
            // console.log(closeInfo)
            // closeInfo.style.animationName = "return";
            // closeInfo.style.animationDuration = '0.5s';
            // closeInfo.style.animationFillModel = "forwards";
        }
    };
    //通知提醒框
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
        //这里的api的内容不能掉错，不然效果不一样
        api.open({
            description:
                '请阅读且同意用户协议与隐私政策',
            placement,
            style: {
                width: 370,
                fontWeight: "bold",
                backgroundColor: 'rgba(240, 197, 79, 1)',
            },
            maxCount: 1
        });
    };
    //检验用户是否同意用户协议的状态
    const [isChecked, setIsChecked] = useState(true);
    return (
        <>
            <div className="picture-background">
                <span className="meetingpd">
                    MEETINGPAD
                </span>
                {/* 左边白色椭圆 */}
                {/* <div onClick={toggleDrawer}> */}
                <Upload
                    //允许多个文件上传
                    multiple={true}
                    fileList={[]}
                    accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                    onChange={handleUploadChange}
                >
                    {showInfo && ( // 根据状态控制是否显示 rectangle
                        <span className="rectangle" >
                            <span className="plus">+</span>
                            <span className="add">添加文件</span>
                        </span>
                    )}
                </Upload>
                <div></div>
                {showInfo && (
                    <span className="balck-square " >
                        <span className="text-square">
                            仅支持上传 PDF、图片、视频文件上传单个文件的大小不超过 100 MB同一批次上传文件数量不超过10个
                        </span>
                    </span>
                )}
                {/* 在这里根据需要展示文件列表 */}
                {showFileBox && (
                    // 选择性显示file-box的效果
                    <div className={`file-box ${showBoxInside ? 'uploading' : ''}`} >
                        {!showBoxInside ? (
                            <div>
                                <span className="text-transfer">文件传输</span>
                                <span className="total-size">共 {getTotalFileSize()} </span>
                                <Upload
                                    //允许多个文件上传
                                    multiple={true}
                                    //隐藏默认文件显示样式
                                    fileList={[]}
                                    accept=".pdf,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                                    onChange={handleUploadChange}
                                >
                                    <span className="text-round">
                                        <span className="text-add">+</span>
                                    </span>
                                </Upload>
                                <div style={{ overflow: "auto", height: 140 }}>
                                    {/* 下面是每一列的内容 */}
                                    {_.map(selectedFiles, (file, index) => {
                                        const fileSize = formatFileSize(file.size);
                                        // 分割文件位置，获取文件的扩展名，并将其转换为小写字母形式。
                                        const fileExtension = file.name.split('.').pop().toLowerCase();
                                        let fileIcon;
                                        // 根据文件扩展名选择对应的 SVG 图标
                                        switch (fileExtension) {
                                            case 'pdf':
                                                fileIcon = <Pdf />;
                                                break;
                                            case 'jpg':
                                            case 'jpeg':
                                            case 'png':
                                            case 'gif':
                                                fileIcon = <Image />;
                                                break;
                                            case 'mp4':
                                            case 'mov':
                                                fileIcon = <Video />;
                                                break;
                                            default:
                                                fileIcon = null;
                                        }
                                        return (
                                            <>
                                                <div key={index} className="file-item" onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
                                                    {fileIcon}
                                                    <div style={{ marginLeft: 10 }}>
                                                        <div className="file-name">{file.name}</div>
                                                        <div className="file-size"> {fileSize}</div>
                                                    </div>
                                                    {isHovered === index && (
                                                        <div className="close-x" onClick={() => handleDeleteFile(index)}>x</div>
                                                    )}
                                                </div>
                                            </>
                                        );
                                    })}
                                </div>
                                <div className="text-container">
                                    <div>
                                        <span className="text-left">有效期</span><span className="text-right" style={{ marginLeft: 194 }}>7天</span><br></br>
                                    </div>
                                    <div style={{ marginTop: 15 }}>
                                        <span className="text-left">上传文件格式限制</span><span className="text-right" style={{ marginLeft: 40 }}>PDF、图片、视频</span><br></br>
                                    </div>
                                    <div style={{ marginTop: 15 }}>
                                        <span className="text-left">单个文件容量限制</span><span className="text-right" style={{ marginLeft: 108 }}>100MB</span><br></br>
                                    </div>
                                    <div style={{ marginTop: 15 }}>
                                        <span className="text-left">单次上传数量限制</span><span className="text-right" style={{ marginLeft: 122 }}>10个</span><br></br>
                                    </div>
                                </div>

                                <div className="text-bottom2">
                                    我已阅读且同意 用户协议 和 隐私政策 并对我分享的文件的合法合规性负责
                                </div>
                                <Checkbox className="checkbox"
                                    checked={isChecked}
                                    //获取是否勾选的状态
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                    //默认效果为选中
                                    defaultChecked={true} />
                                {contextHolder}
                                <Button className="text-button" type="primary"

                                    //这里会有一个判断，判断用户是否同意用户协议，是就上传文件，否提示用户同意文件要求
                                    onClick={() => {
                                        if (!isChecked) {
                                            openNotification('bottomLeft');
                                        } else {
                                            //开始上传文件
                                            setshowBoxInside(true); // 开始上传，隐藏内容
                                        }
                                    }}
                                >开始上传</Button>
                            </div>
                        ) : (
                            <>
                                <div style={{ height: 150, width: 150, padding: '0px 54px',marginTop:-190}}>
                                        <DemoLiquid fileCount={fileCount} getTotalFileSize={getTotalFileSize}/>
                                </div>
                            </>
                        )}
                    </div>
                )}
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
export default LoginPage;
