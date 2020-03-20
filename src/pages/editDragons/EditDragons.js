import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { Spacing, Input, Button} from '@sicredi/react';
import { Formik } from 'formik';


function EditDragons({ history }) {
  const callHome = () => {
    history.push('/home');
  };

  const EditDragon = () => {
    const [dragons, setDragons] = useState();


  }

  return (
    <>
      <Spacing appearance="large" />
      <Header title="Editar Dragão" />
      <Formik>
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
              type="text"
              label="Informe o novo nome do dragão"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              errorMessage={touched.name && errors.name}
              required
            />

            <Input
              name="type"
              type="text"
              label="Informe o novo tipo do dragão"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.type}
              errorMessage={touched.type && errors.type}
              required
            />

            <Input
              name="histories"
              type="text"
              label="Informe a nova história do dragão"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.histories}
              errorMessage={touched.histories && errors.histories}
              required
            />
            <div className="buttons-container">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                appearance="primary"
                block
              >
                Editar
              </Button>
              <Button
                appearance="primary"
                block
                ghost
                onClick={() => callHome()}
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

export default withRouter(EditDragons);
