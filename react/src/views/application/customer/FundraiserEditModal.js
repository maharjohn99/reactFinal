import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Modal,
    Rating,
    TextField,
    Typography
} from '@mui/material';

// fundraiser imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { useQuery } from '@apollo/client';
import { FUNDRAISER_BY_ID } from 'gqloperations/queries';
import AuthCardWrapper from 'views/pages/authentication/AuthCardWrapper';
import EditFundraiser from 'views/pages/authentication/auth-forms/EditFundraiser';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const FundraiserEdit = ({ open, handleCloseModal, selectedId, edit, setEdit }) => {
    const { data, loading, error } = useQuery(FUNDRAISER_BY_ID, {
        variables: {
            id: selectedId
        }
    });
    if (loading) return 'Loading...';
    // if (error) return <pre>{error.message}</pre>;
    return (
        <Modal
            open={open}
            onClose={handleCloseModal}
            sx={{
                '&>div:nth-of-type(3)': {
                    '&>div': {
                        maxWidth: 400
                    }
                }
            }}
        >
            {open && (
                <>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                                <Grid item>
                                    <AuthCardWrapper sx={style}>
                                        <Grid container spacing={2} alignItems="center" justifyContent="center">
                                            <Grid item xs={12}>
                                                <EditFundraiser edit={edit} editData={data} handleCloseModal={handleCloseModal} />
                                            </Grid>
                                        </Grid>
                                    </AuthCardWrapper>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </Modal>
    );
};

FundraiserEdit.propTypes = {
    open: PropTypes.bool,
    handleCloseModal: PropTypes.func,
    selectedId: PropTypes.string
};

export default FundraiserEdit;
