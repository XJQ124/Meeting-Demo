import { useState, useEffect } from "react";
import { Liquid } from '@ant-design/plots';
import ImageYes from "../pictures/yes.png";
import { Button, Drawer,Divider} from 'antd';
import '../Liquid.css'
import _ from "lodash";
import { CloseOutlined} from '@ant-design/icons';

// 方法：每秒来增加一定的百分比
export const DemoLiquid = ({ fileCount, getTotalFileSize }) => {
    // 使用 useState 钩子来存储百分比的值，并初始化为 0
    const [percent, setPercent] = useState(0);
    // 使用 useEffect 钩子来处理实时更新百分比的逻辑
    const [transfer, serTransfer] = useState('传输中')
    // const [transferData, setTransferData] = useState(<><span style={{marginLeft:-30}}>{fileCount}个文件<span>&gt;｜{getTotalFileSize()}</span></span></>)
    //传输数据的显示
    const [transferData, setTransferData] = useState(false);
    //传输过程中按钮的变化
    const [changeButton, setChangeButton] = useState(false)
    //生成一个随机数
    const [random] = useState(_.random(1000, 9999)); // 初始化时生成随机数
    //抽屉开关的状态
    const [open, setOpen] = useState(false);
    // 显示或隐藏抽屉
    const toggleDrawer = () => {
        setOpen(!open); // 如果抽屉是打开的，这会关闭它；如果是关闭的，这会打开它
    };
    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        // 假设每秒钟增加百分之20
        const increasePerSecond = 0.2;
        const interval = setInterval(() => {
            // 检查是否已经达到 100%，如果达到则停止更新
            if (percent >= 1) {
                clearInterval(interval);
                serTransfer('已完成')
                setTransferData(true)
                setChangeButton(true)
                setOpen(true)
            } else {
                // 更新百分比
                setPercent(prevPercent => Math.min(prevPercent + increasePerSecond, 1));
            }
        }, 1000); // 每秒钟执行一次更新
        // 组件卸载时清除定时器
        return () => clearInterval(interval);
    }, [percent]); // 仅在 percent 发生变化时重新运行 useEffect
    // 设置水波图的配置
    const config = {
        percent,
        style: {
            fill: '#F0C54F',
            // height: 40,
            stroke: '#F0C54F',
            //外面环的粗细
            outlineBorder: 2,
            //外面环的长度
            outlineDistance: 4,
            waveLength: 128,
        },
    };
    // 如果百分比达到100%，显示一个覆盖在水波图上方的圆圈
    const overlayCircle = percent >= 1 ? (
        <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#F0C54F',
        }}>
        </div>
    ) : null;
    // 图片样式
    const imageStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: percent >= 1 ? 1 : -1, // 如果百分比达到100%，设置zIndex为1，否则为-1
    };
    // 返回水波图组件、覆盖圆圈和图片
    return (
        <>
        {/* 最外层为了关闭蒙层而设 */}

            <div style={{ position: 'relative', height: 500, zIndex: -1 }}>
                <Liquid {...config} />
                {overlayCircle}
                {percent >= 1 && <img src={ImageYes} alt="#" style={imageStyle} />}
            </div>
            <div className="transfer">
                {transfer}
            </div>
            <div className="preview" >
                {transferData ?
                    <div onClick={toggleDrawer}>传输预览&gt;</div>
                    : <><span style={{ marginLeft: -30 }}>
                        <span>
                            <span onClick={toggleDrawer}>{fileCount}个文件<span>&gt;</span></span>
                            <span>｜{getTotalFileSize()}</span>
                        </span>
                    </span></>}
            </div>
            <div className="pin-style" >传输PIN码</div>
            {/* Pin码 */}
            <div className="box">
                <div className="random">{random}</div>
            </div>
            <div>
                {changeButton ?
                    <div className="button-copy">
                        <Button className="button-use" style={{ backgroundColor: 'rgba(240, 197, 79, 1)' }}>一键复制</Button>
                        <Button className="button-use" >再传一次</Button>
                    </div>
                    : <div className="button-copy2"><Button className="button-use" style={{ backgroundColor: 'rgba(240, 197, 79, 1)' }}>一键复制</Button></div>}
            </div>
            <Drawer
                mask={false}
                closable={false}
                open={open}
                width={'50%'}
            >
                <CloseOutlined onClick={onClose} className="close-icon"/>
                <Divider style={{marginTop:30}}/>
                <div className="text-preview">传输预览</div>
                <div className="text-information" style={{marginTop:20}}>
                    <span >{fileCount}个文件 |</span>
                    <span style={{marginRight:10}}>{getTotalFileSize()}|</span>
                    <span>过期时间</span>
                </div>
                <Divider style={{ marginTop: 20 }} />
              
            </Drawer>   



        </>
    );
};  
