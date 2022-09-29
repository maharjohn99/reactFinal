// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    TextField,
    Select,
    Chip,
    MenuItem,
    Grid
} from '@mui/material';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useMutation, HttpLink, ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
// fundraisers imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { UPDATE_FUNDRAISER } from 'gqloperations/mutations';

// ===========================|| FIREBASE - REGISTER ||=========================== //
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const EditFundraiser = ({ edit, editData, handleCloseModal }) => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql'
        }),
        cache: new InMemoryCache()
    });
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [updateFundraiser] = useMutation(UPDATE_FUNDRAISER);

    const { loading, error } = useMutation(UPDATE_FUNDRAISER);
    if (loading) return 'Loading...';
    if (error) return <pre>{error.message}</pre>;

    return (
        <>
            <Formik
                initialValues={{
                    fundraiserName: editData?.fundraiser.fundraiserName,
                    requestAmount: editData?.fundraiser.requestAmount,
                    startDate: editData?.fundraiser.startDate,
                    endDate: editData?.fundraiser.endDate,
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    fundraiserName: Yup.string().required('Fundraiser Name is required'),
                    requestAmount: Yup.string().required('RequestAmount is required'),
                    startDate: Yup.date().required('Start Date is required'),
                    endDate: Yup.date().required('End Date is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        const id = editData.fundraiser._id;
                        const value = { ...values, id };

                        const fundraiserName = value.fundraiserName;
                        const requestAmount = value.requestAmount;
                        const startDate = value.startDate;
                        const endDate = value.endDate;
                        const _id = value.id;

                        await client
                            .mutate({
                                variables: {
                                    _id,
                                    fundraiserName,
                                    requestAmount,
                                    startDate,
                                    endDate
                                },
                                mutation: UPDATE_FUNDRAISER
                            })
                            .then(
                                () => {
                                    window.location.href = '/fundraiser/fundraiser-list';
                                },
                                (err) => {
                                    if (scriptedRef.current) {
                                        setStatus({ success: false });
                                        setErrors({ submit: err.message });
                                        setSubmitting(false);
                                    }
                                }
                            );
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.fundraiserName && errors.fundraiserName)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-fundraiser-register">Fundraiser Name</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-fundraiser-register"
                                type="text"
                                name="fundraiserName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.fundraiserName}
                            />
                            {touched.fundraiserName && errors.fundraiserName && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.fundraiserName}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.requestAmount && errors.requestAmount)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-fundraiser-amount">Request Amount</InputLabel>

                            <OutlinedInput
                                id="outlined-adornment-fundraiser-description"
                                type="text"
                                name="requestAmount"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                                value={values.requestAmount}
                            />
                            {touched.requestAmount && errors.requestAmount && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.requestAmount}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <InputLabel htmlFor="outlined-adornment-fundraiser-start">Fundraiser Start Date</InputLabel>
                        <FormControl
                            fullWidth
                            error={Boolean(touched.startDate && errors.startDate)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="outlined-adornment-fundraiser-start"
                                    name="startDate"
                                    renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                    value={values.startDate}
                                    onChange={(dateFromValue) => {
                                        setFieldValue('startDate', dateFromValue.toISOString());
                                    }}
                                />
                            </LocalizationProvider>

                            {touched.startDate && errors.startDate && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.startDate}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <InputLabel htmlFor="outlined-adornment-fundraiser-end">fundraiser End Date</InputLabel>
                        <FormControl fullWidth error={Boolean(touched.endDate && errors.endDate)} sx={{ ...theme.typography.customInput }}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    id="outlined-adornment-fundraiser-start"
                                    name="endDate"
                                    renderInput={(props) => <TextField fullWidth {...props} helperText="" />}
                                    value={values.endDate}
                                    onChange={(dateFromValue) => {
                                        setFieldValue('endDate', dateFromValue.toISOString());
                                    }}
                                />
                            </LocalizationProvider>
                            {touched.endDate && errors.endDate && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.endDate}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ width: '100%' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={6}>
                                    <Button
                                        disableElevation
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Edit Fundraiser
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button fullWidth size="large" variant="contained" color="primary" onClick={handleCloseModal}>
                                        Close
                                    </Button>
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <Item>3</Item>
                                </Grid>
                                <Grid item xs={6}>
                                    <Item>4</Item>
                                </Grid> */}
                            </Grid>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default EditFundraiser;
