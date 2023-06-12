import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showOff, showOn, selectSidebarShow, foldOff, foldOn, selectSidebarUnfoldable } from 'src/store/sidebarSlice';
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav';
import { logoNegative } from 'src/assets/brand/logo-negative';
import { sygnet } from 'src/assets/brand/sygnet';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
// sidebar nav config
import navigation from '../../_nav';

const AppSidebar = () => {
    const dispatch = useDispatch();

    const sidebarShow = useSelector(selectSidebarShow);
    const sidebarUnfoldable = useSelector(selectSidebarUnfoldable);
    // console.debug({ sidebarUnfoldable });

    return (
        <CSidebar
            position="fixed"
            unfoldable={sidebarUnfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => {
                if (visible) dispatch(showOn());
                else dispatch(showOff());
            }}
        >
            <CSidebarBrand className="d-none d-md-flex" to="/">
                <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
                <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
            </CSidebarBrand>
            <CSidebarNav>
                <SimpleBar>
                    <AppSidebarNav items={navigation} />
                </SimpleBar>
            </CSidebarNav>
            <CSidebarToggler
                className="d-none d-lg-flex"
                onClick={() => dispatch(sidebarUnfoldable ? foldOn() : foldOff())}
            />
        </CSidebar>
    );
};

export default React.memo(AppSidebar);
