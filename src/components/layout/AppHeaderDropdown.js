import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CAvatar,
    CBadge,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react';
import { cilBell, cilAccountLogout } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import avatar8 from './../../assets/images/avatars/1.jpg';
import { removeCookie } from 'src/libs/cookie-manager';

const AppHeaderDropdown = () => {
    const navigate = useNavigate();

    return (
        <CDropdown variant="nav-item">
            <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                <CAvatar src={avatar8} size="md" />
            </CDropdownToggle>
            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
                <CDropdownItem href="#">
                    <CIcon icon={cilBell} className="me-2" />
                    Profile
                    <CBadge color="info" className="ms-2">
                        1
                    </CBadge>
                </CDropdownItem>
                <CDropdownDivider />
                <CDropdownItem
                    // href="#"
                    onClick={() => {
                        removeCookie('access_token');
                        removeCookie('access_type');
                        removeCookie('user');

                        navigate('/login');
                    }}
                >
                    <CIcon icon={cilAccountLogout} className="me-2" />
                    Logout
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    );
};

export default AppHeaderDropdown;
