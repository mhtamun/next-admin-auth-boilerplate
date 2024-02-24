import React from 'react';

// third-party
import { GetServerSideProps } from 'next';

// application
import { getAuthorized } from '../libs/auth';
import { showToast } from '../utils/toast';
import { callGetApi } from '../libs/api';

export const getServerSideProps: GetServerSideProps = async context => getAuthorized(context, 'Dashboard');

const IndexPage = () => {
    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Dashboard</h5>
                   
                </div>
            </div>
        </div>
    );
};

export default IndexPage;
