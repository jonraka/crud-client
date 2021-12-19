import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';

const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  /* table-layout: fixed; */
  padding: 5px;
  margin-top: 10px;
  overflow: hidden;
  background-color: #0000006e;
  border-radius: 5px;
  color: white;
  border-collapse: collapse;
  box-shadow: 5px 5px 5px #00000058;
  border: 1px solid black;

  /* & td {
        width: 25%;
    } */

  & thead {
    background-color: red;
    color: black;
    cursor: default;
  }

  & tbody td {
    line-break: anywhere;
  }

  & th,
  & td {
    padding: 5px;
    border: 1px solid #00000030;
  }

  & thead th:last-of-type {
    min-width: 90px;
  }

  & tbody tr:nth-child(odd) {
    background-color: #ffffff13;
  }

  /* & tbody tr:hover {
        background-color: rgba(255, 255, 255, 0.01);
    } */

  @media (max-width: 700px) {
    & tbody td:before {
      content: attr(data-category) ': ';
    }

    & tr {
      display: flex;
      flex-direction: column;
    }

    & thead {
      display: none;
    }
  }
`;

export default function UsersTable() {
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isSubscribed = true;

    fetch(process.env.REACT_APP_API_ENDPOINT + '/users')
      .then((res) => {
        if (res.status === 404)
          throw new Error('Serveris neveikia, pabandykite vėliau.');
        return res.json();
      })
      .then((res) => {
        if (!isSubscribed) return;
        if (res.error) throw new Error(res.error);

        setState({
          loading: false,
          data: res.data,
          error: null,
        });
      })
      .catch((err) => {
        if (!isSubscribed) return;

        setState({
          loading: false,
          data: null,
          error: err.message,
        });
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>Identifikatorius</th>
          <th>Vardas</th>
          <th>Amžius</th>
          <th>El.paštas</th>
          <th>Veiskmai</th>
        </tr>
      </thead>
      <tbody>
        {state.loading ? (
          <tr>
            <td colSpan={5}>Kraunama</td>
          </tr>
        ) : state.error ? (
          <tr>
            <td colSpan={5}>{state.error}</td>
          </tr>
        ) : state.data && state.data.length ? (
          state.data.map(({ _id, name, age, email }) => (
            <tr key={_id}>
              <td data-category="Identifikatorius">{_id}</td>
              <td data-category="Vardas">{name}</td>
              <td data-category="Amžius">{age}</td>
              <td data-category="El. paštas">{email}</td>
              <td data-category="Veiksmai">
                <Button
                  onClick={() =>
                    navigate(`/users/edit/${_id}`, { replace: false })
                  }
                >
                  Redaguoti
                </Button>
                <Button
                  onClick={() =>
                    navigate(`/users/delete/${_id}`, { replace: false })
                  }
                >
                  Ištrinti
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5}>Nėra vartotojų, pridėkite bent vieną vartotoją.</td>
          </tr>
        )}
      </tbody>
    </StyledTable>
  );
}
