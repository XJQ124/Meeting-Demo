import _ from 'lodash';

//判断文件类型
export const formatFileSize = (size) => {
    if (size < 1024) {
        return `${size} 字节`;
    } else if (size < 1024 * 1024) {
        return `${_.round(size / 1024, 2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
        return `${_.round(size / (1024 * 1024), 2)} MB`;
    } else {
        return `${_.round(size / (1024 * 1024 * 1024), 2)} GB`;
    }
};