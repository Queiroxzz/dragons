import React from 'react';
import { Spacing, Input, Button, toast } from '@sicredi/react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import * as yup from 'yup';
import { Formik } from 'formik';
import { ERRORS } from '../../config/constants';

function Password({ history }) {
  const validationSchema = yup.object().shape({
    username: yup.string().required(ERRORS.REQUIRED_FIELD),
    email: yup
      .string()
      .email()
      .required(ERRORS.REQUIRED_FIELD),
    password: yup.string().required(ERRORS.REQUIRED_FIELD),
    resetPassword: yup.string().required(ERRORS.REQUIRED_FIELD),
    passwordConfirmation: yup
      .string()
      .required(ERRORS.REQUIRED_FIELD)
      .oneOf([yup.ref('resetPassword'), null], 'Senhas não combinam'),
  });

  const initialValues = {
    username: '',
    password: '',
    resetPassword: '',
    passwordConfirmation: '',
    email: '',
  };

  const onSubmit = (values, { setSubtmitting, resetForm }) => {
    const user = window.sessionStorage.getItem('user');
    const password = window.sessionStorage.getItem('password');
    const email = window.sessionStorage.getItem('email');

    if (
      values.username === user &&
      values.email === email &&
      values.password === password
    ) {
      window.sessionStorage.setItem('password', values.resetPassword);
      toast.success('Senha alterada com sucesso');
      resetForm(initialValues);
      callLogin();
    } else {
      toast.error('Usuário ou senha não conferem')
    }

    setSubtmitting(false)

  };

  const callLogin = () => {
    history.push('/login');
  };

  return (
    <>
      <Spacing appearance="large" />
      <Header title="Alteração de senha" />

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
              required
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.email && errors.email}
            />

            <Input
              name="username"
              type="text"
              label="Infome seu usuário"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.username && errors.username}
              required
            />

            <Input
              name="password"
              type="password"
              label="Infome sua senha atual"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.password && errors.password}
              required
            />

            <Input
              name="resetPassword"
              type="password"
              label="Infome sua nova senha"
              value={values.resetPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.resetPassword && errors.resetPassword}
              required
            />

            <Input
              name="passwordConfirmation"
              type="password"
              label="Confirme sua nova senha"
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
                appearance="primary"
                block
                disabled={!isValid || isSubmitting}
              >
                Mudar senha
              </Button>

              <Button
                appearance="primary"
                block
                ghost
                onClick={() => callLogin()}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
Password.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
export default withRouter(Password);
