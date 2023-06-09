import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import { login } from 'src/api/auth';
import { setCookie } from 'src/libs/cookie-manager';

const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        enableReinitialize: false,

        initialValues: {
            email: 'mhtamun@gmail.com',
            password: '123456',
        },

        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().required('Required'),
        }),

        onSubmit: (values, { setSubmitting }) => {
            setSubmitting(true);

            login(values)
                .then((response) => {
                    if (!response) {
                        // showErrorToast('Invalid response!');

                        throw new Error();
                    }

                    if (response.statusCode !== 200) {
                        // showErrorToast(response.message);

                        throw new Error();
                    }

                    setCookie('access_token', response.data.access_token);
                    setCookie('access_type', response.data.access_type);
                    setCookie('user', response.data.user);

                    navigate('/dashboard');
                })
                .catch((error) => {
                    console.error(error);

                    // showErrorToast('Something went wrong!');
                })
                .finally(() => {
                    setSubmitting(false);
                });
        },
    });

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm onSubmit={formik.handleSubmit}>
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="Enter your email address..."
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                autoComplete="email"
                                            />
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter your password..."
                                                onChange={formik.handleChange}
                                                value={formik.values.password}
                                                autoComplete="password"
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton
                                                    type="submit"
                                                    color="primary"
                                                    className="px-4"
                                                    disabled={formik.isSubmitting}
                                                >
                                                    Login
                                                </CButton>
                                            </CCol>
                                            <CCol xs={6} style={{ textAlign: 'right' }}>
                                                <CButton
                                                    color="link"
                                                    className="px-0"
                                                    onClick={() => {
                                                        navigate('/reset-password');
                                                    }}
                                                >
                                                    Forgot password?
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    );
};

export default Login;
