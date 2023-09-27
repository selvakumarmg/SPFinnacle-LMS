import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';

const AdditionalDetailsStep = ({ values, errors, handleChange, CustomErrorMessage }) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Field
            as={TextField}
            name="address"
            label="Address"
            variant="outlined"
            fullWidth
            helperText={<CustomErrorMessage name="address" />}
            error={!!(values.address && errors.address)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            as={TextField}
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            helperText={<CustomErrorMessage name="city" />}
            error={!!(values.city && errors.city)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            as={TextField}
            name="state"
            label="State"
            variant="outlined"
            fullWidth
            helperText={<CustomErrorMessage name="state" />}
            error={!!(values.state && errors.state)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            as={TextField}
            name="pincode"
            label="PIN Code"
            variant="outlined"
            fullWidth
            helperText={<CustomErrorMessage name="pincode" />}
            error={!!(values.pincode && errors.pincode)}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Field
            as={TextField}
            name="pancard"
            label="PAN Card Number"
            variant="outlined"
            fullWidth
            helperText={<CustomErrorMessage name="pancard" />}
            error={!!(values.pancard && errors.pancard)}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
        <input
          id="pancardFile"
          name="pancardFile"
          type="file"
          accept="image/*,.pdf"
          onChange={(event) => setFieldValue('pancardFile', event.currentTarget.files[0])}
        />
        <ErrorMessage name="pancardFile" className="error" />
      </Grid> */}
      </Grid>
    </React.Fragment>
  );
};

export default AdditionalDetailsStep;
