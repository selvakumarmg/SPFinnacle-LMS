// UserInfoStep.js
import React from 'react';
import { Field } from 'formik';
import { Button, Grid, InputAdornment, TextField } from '@material-ui/core';

const UserInfoStep = ({ values, errors, handleChange,setOpenOTPDialog }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <Field
        as={TextField}
        name="username"
        label="Username"
        variant="outlined"
        fullWidth
        helperText={errors.username}
        error={!!(values.username && errors.username)}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Field
        as={TextField}
        name="email"
        label="Email"
        variant="outlined"
        fullWidth
        helperText={errors.email}
        error={!!(values.email && errors.email)}
        onChange={handleChange}
      />
    </Grid>
    <Grid item xs={12}>
      <Field
        as={TextField}
        name="phone"
        label="Mobile Number"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained" color="primary" onClick={setOpenOTPDialog}>
                Get OTP
              </Button>
            </InputAdornment>
          ),
        }}
        helperText={errors.phone}
        error={!!(values.phone && errors.phone)}
        onChange={handleChange}
      />
    </Grid>
  </Grid>
);

export default UserInfoStep;
