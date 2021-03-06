import './Sidebar.less';
import React, { useState } from 'react';
import { defaultSettings } from '../../settings';
import { useStore } from '../../utils/hooks';
import Element from './Element';
import { DownOutlined, UpOutlined, MenuFoldOutlined } from '@ant-design/icons';

const Sidebar = (props) => {
    const [hidden, setHidden] = useState({});
    const [showLeft, setShowLeft] = useState(true);
    const { userProps = {}, imperativeHandle } = useStore();
    const { settings } = userProps;
    const _settings = Array.isArray(settings) ? settings : defaultSettings;
    const onClickTitle = (idx) => {
        setHidden({ ...hidden, [idx]: !hidden[idx] });
    };
    const toggleLeft = () => setShowLeft(!showLeft);
    const ToggleIcon = () => (
        <div className="absolute top-0 right-0 pointer toggleIcon" onClick={toggleLeft}>
            <MenuFoldOutlined className="left-menu-icon" />
        </div>
    );
    const HideLeftArrow = () => (
        <div className="relative left-0 top-0 h2 flex-center head-left-arrow">
            <ToggleIcon />
        </div>
    );

    imperativeHandle.toggleLeft = (v) => setShowLeft(v);

    if (showLeft) {
        return (
            <div className="left-layout relative w5-l w4">
                <ToggleIcon />
                {Array.isArray(_settings) ? (
                    _settings.map((item, idx) => {
                        if (item && item.show === false) {
                            return null;
                        }
                        return (
                            <div key={idx}>
                                <p className="f6 b" onClick={() => onClickTitle(idx)}>
                                    <span className="item-title">{item.title}</span>
                                    {!hidden[idx] ? (
                                        <UpOutlined className="right-action" />
                                    ) : (
                                        <DownOutlined className="right-action" />
                                    )}
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
                                            <div>??????????????????</div>
                                        )}
                                    </ul>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div>???????????????Setting????????????</div>
                )}
            </div>
        );
    } else {
        return <HideLeftArrow />;
    }
};

export default Sidebar;
