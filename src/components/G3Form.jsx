import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const G3Form = ({ initialValues, onSubmit, validationSchema, onSubmitBtnLabel,showPrev, prevBtn }) => {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {Object.keys(initialValues).map((fieldName) => (
        <div key={fieldName} className="mb-4">
          <label htmlFor={fieldName} className="block text-gray-600 text-sm font-medium mb-1">
            {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
          </label>
          <input
            type="text"
            id={fieldName}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            className="w-full p-2 border rounded-lg border-gray-300 focus:outline-none focus:border-blue-500"
          />
          {formik.touched[fieldName] && formik.errors[fieldName] ? (
            <div className="text-red-600 text-xs mt-1">{formik.errors[fieldName]}</div>
          ) : null}
        </div>
      ))}
      
      <div className="flex justify-between">
  <button
    type="button"
    onClick={prevBtn}
    className={`${
      showPrev ? '' : 'hidden'
    } bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600`}
  >
    Prev
  </button>

  <div className="flex space-x-4">
    <div className="flex-grow"></div>

    <button
      type="submit"
      className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    >
      {onSubmitBtnLabel}
    </button>
  </div>
</div>


    </form>
  );
};

export default G3Form;
