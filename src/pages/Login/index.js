import { Button, Input } from '@sicredi/react';
import { Formik } from 'formik';
import React from 'react';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import Header from '../../components/Header/Header';
import { ERRORS } from '../../config/constants';
import './index.css';

const Login = ({ history }) => {

  const loginSchema = yup.object().shape({
    username: yup.string().required(ERRORS.REQUIRED_FIELD),
    password: yup.string().required(ERRORS.REQUIRED_FIELD),
  });

  const callPassword = () => {
    history.push('/password');
  };

  const callRegister = () => {
    history.push('/register');
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log('formulario enviado.', values);

    const username = window.sessionStorage.getItem('user');
    const password = window.sessionStorage.getItem('password');

    if (
      username &&
      password &&
      values.username === username &&
      values.password === password
    ) {
      history.push('/home');
    } else {
      alert('Senha ou usuário incorretos');
    }

    setSubmitting(false);
  };

  return (
    <>
      <Header textAlign="left" title="Login" />

      <Formik
        validationSchema={loginSchema}
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
        }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Input
              value={values.username}
              label="Usuário"
              name="username"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.username && errors.username}
              required
            />

            <Input
              value={values.password}
              label="Senha"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              errorMessage={touched.password && errors.password}
              required
            />

            <div>
              <Button id="newPassword" onClick={() => callPassword()}>
                Esqueceu sua senha?
              </Button>
            </div>
            <div>
              <Button id="registerLink" onClick={() => callRegister()}>
                Não tem um cadastro?
              </Button>
            </div>

            <div className="buttons-container">
              <Button type="submit" appearance="primary" block>
                Entrar
              </Button>
              <Button appearance="primary" ghost block>
                Voltar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default withRouter(Login);
