/* eslint-disable @next/next/no-img-element */

import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import Link from 'next/link';
import { classNames } from 'primereact/utils';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menu = useRef<Menu>(null);

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current,
    }));

    const toggleMenu: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
        menu.current?.toggle(event);
    };

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img
                    src={`/layout/images/logo-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`}
                    width="47.22px"
                    height={'35px'}
                    alt="logo"
                />
                <span>SAKAI</span>
            </Link>

            <button
                ref={menubuttonRef}
                type="button"
                className="p-link layout-menu-button layout-topbar-button"
                onClick={onMenuToggle}
            >
                <i className="pi pi-bars" />
            </button>

            <button
                ref={topbarmenubuttonRef}
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
                onClick={showProfileSidebar}
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <div
                ref={topbarmenuRef}
                className={classNames('layout-topbar-menu', {
                    'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
                })}
            >
                <Menu
                    ref={menu}
                    model={[
                        {
                            label: 'Profile',
                            icon: 'pi pi-user',
                        },
                        {
                            separator: true,
                        },
                        {
                            label: 'Logout',
                            icon: 'pi pi-sign-out',
                        },
                    ]}
                    popup
                />
                <Button
                    type="button"
                    label="Settings"
                    icon="pi pi-angle-down"
                    onClick={toggleMenu}
                    style={{ width: 'auto' }}
                />
            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
