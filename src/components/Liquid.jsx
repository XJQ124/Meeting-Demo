import { useState, useEffect } from "react";
import { Liquid } from '@ant-design/plots';
import ImageYes from "../pictures/yes.png"
// 方法：每秒来增加一定的百分比
export const DemoLiquid = ({ selectedFiles }) => {
    // 使用 useState 钩子来存储百分比的值，并初始化为 0
    const [percent, setPercent] = useState(0);
    // 使用 useEffect 钩子来处理实时更新百分比的逻辑
    useEffect(() => {
        // 假设每秒钟增加百分之20
        const increasePerSecond = 0.2;
        const interval = setInterval(() => {
            // 检查是否已经达到 100%，如果达到则停止更新
            if (percent >= 1) {
                clearInterval(interval);
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
        <div style={{ position: 'relative' }}>
            <Liquid {...config} />
            {overlayCircle}
            {percent >= 1 && <img src={ImageYes} alt="#" style={imageStyle} />}
        </div>
    );
};

