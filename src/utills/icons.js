import PdfIcon from '../pictures/pdf.svg'
import VideoIcon from '../pictures/video.svg'
import ImageIcon from '../pictures/image.svg'
//定义三个图片组件

export const Pdf = () => {
    return (
        <div>
            <img src={PdfIcon} alt='Pdf图标' />
        </div>
    )
}
export const Image = () => {
    return (
        <div>
            <img src={ImageIcon} alt="照片" />
        </div>
    )
}
export const Video = () => {
    return (
        <div>
            <img src={VideoIcon} alt='Video图标' />
        </div>
    )
}