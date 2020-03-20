import React from 'react';
import { Button, Input, Spacing } from '@sicredi/react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ERRORS } from '../../config/constants';
import './index';

const Register = ({ history }) => {
  const validationSchema = yup.object().shape({
    username: yup.string().required(ERRORS.REQUIRED_FIELD),
    email: yup
      .string()
      .email()
      .required(ERRORS.REQUIRED_FIELD),
    password: yup.string().required(ERRORS.REQUIRED_FIELD),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Senhas não combinam'),
  });

  const callLogin = () => {
    history.push('/login');
  };
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
    email: '',
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    window.sessionStorage.setItem('user', values.username);
    window.sessionStorage.setItem('password', values.password);
    window.sessionStorage.setItem('email', values.email);
    resetForm(initialValues);
    setSubmitting(false);
    history.push('/login');
  };

  return (
    <>
      <Spacing appearance="large" />
      <Header title="Já tem cadastro?" />

      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({
          values,
          setFieldValue,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid,
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Input
              name="email"
              type="email"
              label="Informe seu email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.email && errors.email}
              required
            />

            <Input
              name="username"
              type="text"
              label="Defina um usuário"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.username && errors.username}
              required
            />

            <Input
              name="password"
              type="password"
              label="Defina uma senha"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.password && errors.password}
              required
            />

            <Input
              name="passwordConfirmation"
              type="password"
              label="Confirme uma senha"
              value={values.passwordConfirmation}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={
                touched.passwordConfirmation && errors.passwordConfirmation
              }
              required
            />

            <div className="buttons-container">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                appearance="primary"
                block
              >
                Cadastrar
              </Button>
              <Button
                appearance="primary"
                block
                ghost
                onClick={() => callLogin()}
              >
                Voltar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};
Register.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default withRouter(Register);
