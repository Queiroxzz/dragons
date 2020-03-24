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
    naimport { Button, Input, Spacing, toast, Loader } from '@sicredi/react';
    import axios from 'axios';
    import { Formik } from 'formik';
    import React, { useEffect, useState } from 'react';
    import { withRouter } from 'react-router-dom';
    import * as yup from 'yup';
    import Header from '../../components/Header/Header';
    import { BASE_URL, ERRORS } from '../../config/constants';
    import { useParams } from 'react-router-dom';
    
    function DragonRegister({ history }) {
      const [loader, showLoader] = useState(false);
    
      // Estado inicial do dragão (FORM)
      const [dragon, setDragon] = useState({
        name: '',
        histories: '',
        type: '',
      });
    
      // Busca da URL o PARAMETRO ID
      // o useParams é uma função do próprio react-router-dom (library de rotas)
      const { id } = useParams();
    
      // VALIDADOR DO FORMULÁRIO
      const validationSchema = yup.object().shape({
        name: yup.string().required(ERRORS.REQUIRED_FIELD),
        histories: yup.string().required(ERRORS.REQUIRED_FIELD),
        type: yup.string().required(ERRORS.REQUIRED_FIELD),
      });
    
      useEffect(() => {
        // criamos uma funcao para buscar as informacoes do dragao pelo ID
        const getDragon = async () => {
          showLoader(true);
          const { data } = await axios.get(`${BASE_URL}/${id}`);
          console.log(`DRAGAO =>`, data);
          // no retorno do serviço, pegamos as informações do dragão e populamos nosso dragon/initialValues;
          // ao REPOPULAR o dragão, ele dispara um evento para atualizar as informações do FORMIK (enableRenitialize={true})
          setDragon({
            name: data.name,
            type: data.type,
            histories: data.histories,
          });
          showLoader(false);
        };
    
        // verificamos ao entrar na página, se veio na tela de edição ou da tela de cadastro.
        // caso tenha ID, veio para edição, ou seja, buscamos o dragão.
        if (id) {
          getDragon();
        }
      }, [id]);
    
      // INITIAL VALUES
      const initialValues = {
        name: dragon.name, // é o que tá vazio ali em cima na inicializacao do dragão.
        histories: dragon.histories, // é o que tá vazio ali em cima na inicializacao do dragão.
        type: dragon.type, // é o que tá vazio ali em cima na inicializacao do dragão.
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
          let response;
          if (id) {
            response = await axios.put(`${BASE_URL}/${id}`, dragon);
          } else {
            response = await axios.post(BASE_URL, dragon);
          }
          toast.success(`${response.data.name} cadastrado com sucesso.`);
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
          <Loader show={loader} fullScreen={true} />
          <Spacing appearance="large" />
          <Header title="Cadastre o dragão" />
          <Formik
            enableReinitialize={true}
            // esse intialValues = iniciamos lá em cima com o dragon. com as propriedades vazias
            // dragon  = {
            //   name: '',
            //   type: '',
            //   histories: ''
            // }
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
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  label="Informe o nome"
                  required
                  errorMessage={touched.name && errors.name}
                />
    
                <Input
                  value={values.type}
                  name="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  label="Informe o tipo"
                  required
                  errorMessage={touched.type && errors.type}
                />
    
                <Input
                  value={values.histories}
                  name="histories"
                  type="text"
                  label="Informe a historia"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  errorMessage={touched.histories && errors.histories}
                />
    
                <div className="buttons-container">
                  <Button
                    type="submit"
                    appearance="primary"
                    disabled={!isValid || isSubmitting}
                    block
                  >
                    Cadastrar
                  </Button>
                  <Button
                    appearance="primary"
                    onClick={() => callHome()}
                    block
                    ghost
                  >
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
    me: yup.string().required(ERRORS.REQUIRED_FIELD),
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
