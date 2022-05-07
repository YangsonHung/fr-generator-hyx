import './Settings.less';
import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import ItemSettings from './ItemSettings';
import GlobalSettings from './GlobalSettings';
import { useStore, useSet } from '../../utils/hooks';

const { TabPane } = Tabs;

const Settings = ({ widgets }) => {
    const [state, setState] = useSet({
        tabsKey: 'globalSettings',
        showRight: true,
        showItemSettings: false,
    });
    const { selected, imperativeHandle } = useStore();
    const { tabsKey, showRight, showItemSettings } = state;
    const toggleRight = () => setState({ showRight: !showRight });
    const ToggleIcon = () => (
        <div className="absolute top-0 left-0 pointer toggleIcon" onClick={toggleRight}>
            <MenuUnfoldOutlined className="right-menu-icon" />
        </div>
    );
    const HideRightArrow = () => (
        <div className="relative right-0 top-0 h2 flex-center head-right-arrow">
            <ToggleIcon />
        </div>
    );
    // 如果没有选中任何item，或者是选中了根节点，object、list的内部，显示placeholder
    useEffect(() => {
        if ((selected && selected[0] === '0') || selected === '#' || !selected) {
            setState({ tabsKey: 'globalSettings', showItemSettings: false });
        } else {
            setState({ tabsKey: 'itemSettings', showItemSettings: true });
        }
    }, [selected]);

    imperativeHandle.toggleRight = (v) => setState({ showRight: v });

    if (showRight) {
        return (
            <div className="right-layout relative pl2">
                <ToggleIcon />
                <Tabs activeKey={tabsKey} onChange={(key) => setState({ tabsKey: key })}>
                    {showItemSettings && (
                        <TabPane tab={<span>组件配置</span>} key="itemSettings">
                            <ItemSettings widgets={widgets} />
                        </TabPane>
                    )}
                    <TabPane tab="表单配置" key="globalSettings">
                        <GlobalSettings widgets={widgets} />
                    </TabPane>
                </Tabs>
            </div>
        );
    } else {
        return <HideRightArrow />;
    }
};

export default Settings;
