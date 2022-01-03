import React, { useState } from 'react';
import { defaultSettings } from '../../settings';
import { useStore } from '../../utils/hooks';
import Element from './Element';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './index.less';

const Sidebar = (props) => {
    const [hidden, setHidden] = useState({});
    const { userProps = {} } = useStore();
    const { settings } = userProps;
    const _settings = Array.isArray(settings) ? settings : defaultSettings;
    const onClickTitle = (idx) => {
        setHidden({ ...hidden, [idx]: !hidden[idx] });
    };

    return (
        <div className="left-layout w5-l w4">
            {Array.isArray(_settings) ? (
                _settings.map((item, idx) => {
                    if (item && item.show === false) {
                        return null;
                    }
                    return (
                        <div key={idx}>
                            <p className="f6 b" onClick={() => onClickTitle(idx)}>
                                <span>{item.title}</span>
                                <UpOutlined className="right-action" />
                            </p>
                            {!hidden[idx] && (
                                <ul className="pl0">
                                    {Array.isArray(item.widgets) ? (
                                        item.widgets
                                            .filter((item) => item.show !== false)
                                            .map((widget, idx) => {
                                                return (
                                                    <Element
                                                        key={idx.toString()}
                                                        {...props}
                                                        {...widget}
                                                    />
                                                );
                                            })
                                    ) : (
                                        <div>此处配置有误</div>
                                    )}
                                </ul>
                            )}
                        </div>
                    );
                })
            ) : (
                <div>配置错误：Setting不是数组</div>
            )}
        </div>
    );
};

export default Sidebar;
