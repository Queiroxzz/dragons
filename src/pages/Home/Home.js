import { Button, Spacing, toast, Loader} from '@sicredi/react';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { BASE_URL } from '../../config/constants';
import '../../index.css';
import './home.css';

function Home({ history }) {
  const [dragons, setDragons] = useState([]);
  const [loader, showLoader] = useState(false);

  const getDragons = useCallback(async () => {
    showLoader(true);
    try {
      const { data } = await axios.get(BASE_URL);
      setDragons(data);
    } catch (error) {
      console.log(error);
    }
    showLoader(false);
  }, []);

  useEffect(() => {
    getDragons();
  }, [getDragons]);

  const editDragon = id => {
    history.push(`/dragonRegister/${id}`);
  };

  const deleteDragons = async () => {
    const radios = document.getElementsByName('dragonId');
    let idDragon;
    radios.forEach(radio => {
      if (radio.checked) {
        idDragon = radio.value;
      }
    });

    if (!idDragon) {
      toast.error('Selecione um dragão');
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/${idDragon}`);
      toast.success('Dragão deletado com sucesso');
      getDragons();
    } catch {
      toast.error('Dragão não pode ser deletado no momento, tente mais tarde');
    }
  };


  const callDragonRegister = () => {
    history.push('/dragonRegister');
  };

  const formatDate = date => {
    const dateParsed = new Date(date);
    return new Intl.DateTimeFormat('pt').format(dateParsed);
  };

  return (
    <>
      <Loader show={loader} />
      <Spacing appearance="large" />
      <Header title="Lista de dragões" />

      <table id="dragons-list">
        <thead>
          <tr>
            <th></th>

            <th>Id</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Data de criação</th>
            <th>Historia</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody id="table-dragon">
          {dragons.map(dragon => {
            return (
              <tr key={dragon.id}>
                <tr>
                  <input type="radio" name="dragonId" value={dragon.id} />
                </tr>

                <td>{dragon.id}</td>
                <td>{dragon.name}</td>
                <td>{dragon.type}</td>
                <td>{formatDate(dragon.createdAt)}</td>
                <td>{dragon.histories}</td>
                <td>
                  <Button onClick={() => editDragon(dragon.id)}>Editar</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="buttons-container">
        <Button
          type="submit"
          onClick={() => callDragonRegister()}
          appearance="primary"
          block
        >
          Cadastrar Dragão
        </Button>
        <Button
          appearance="primary"
          onClick={() => deleteDragons()}
          ghost
          block
        >
          Deletar Dragão
        </Button>
      </div>
    </>
  );
}

export default withRouter(Home);
