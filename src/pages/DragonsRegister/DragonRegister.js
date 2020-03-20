import { Button, Input, Spacing, toast } from '@sicredi/react';
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react';
import { withRouter } from 'react-router-dom';
import * as yup from 'yup';
import Header from '../../components/Header/Header';
import { BASE_URL, ERRORS } from '../../config/constants';

function DragonRegister({ history }) {
  const validationSchema = yup.object().shape({
    name: yup.string().required(ERRORS.REQUIRED_FIELD),
    histories: yup.string().required(ERRORS.REQUIRED_FIELD),
    type: yup.string().required(ERRORS.REQUIRED_FIELD),
  });

  const initialValues = {
    name: '',
    histories: '',
    type: '',
  };

  const callHome = () => {
    history.push('/home');
  };

  const onSubmit = async values => {
    console.log(values);

    const dragon = {
      name: values.name,
      type: values.type,
      histories: values.histories,
    };

    try {
      const { data } = await axios.post(BASE_URL, dragon);
      toast.success(`${data.name} cadastrado com sucesso.`);
      history.push('/home');
    } catch {
      toast.error(
        'Não foi possivel cadastrar o seu dragão no momento. Tente novamente mais tarde.',
      );
    }
    return;
  };

  return (
    <>
      <Spacing appearance="large" />
      <Header title="Cadastre o dragão" />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="Informe o nome"
              required
              errorMessage={touched.name && errors.name}
            />

            <Input
              name="type"
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              label="Informe o tipo"
              required
              errorMessage={touched.type && errors.type}
            />

            <Input
              name="histories"
              type="text"
              label="Informe a historia"
              onChange={handleChange}
              onBlur={handleBlur}
              required
              errorMessage={touched.histories && errors.histories}
            />

            <div className="buttons-container">
              <Button type="submit" appearance="primary" disabled={!isValid || isSubmitting} block>
                Cadastrar
              </Button>
              <Button appearance="primary" onClick={() => callHome()} block ghost>
                Voltar
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}

export default withRouter(DragonRegister);
