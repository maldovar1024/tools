import { Layout, Menu } from 'antd';
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

const { Sider } = Layout;
const { Item } = Menu;

export type NavLinkConfig = Array<{ to: string; text: string }>;

interface SideBarProps {
  theme?: 'light' | 'dark';
  linkProps: NavLinkConfig;
}

const SideBar: FC<SideBarProps> = ({ theme = 'light', linkProps }) => {
  const location = useLocation();

  return (
    <Sider theme={theme}>
      <Menu theme={theme} mode="inline" selectedKeys={[location.pathname]}>
        {linkProps.map(({ to, text }) => (
          <Item key={to}>
            <Link to={to}>{text}</Link>
          </Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideBar;
