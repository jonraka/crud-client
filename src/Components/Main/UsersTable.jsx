import { useEffect, useState } from "react"
import styled from "styled-components";
import Button from "../UI/Button";

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

    & th, & td {
        padding: 5px;
        border: 1px solid #00000030;
    }

    & thead th:last-of-type {
        min-width: 90px;
    }

    & tbody tr:nth-child(odd){
        background-color: #ffffff13;
    }

    /* & tbody tr:hover {
        background-color: rgba(255, 255, 255, 0.01);
    } */
`;

export default function UsersTable() {
    const [state, setState] = useState({
        loading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        let isSubscribed = true;

        fetch(process.env.REACT_APP_API_ENDPOINT + '/users').then(res => {
            if (res.status === 404) throw new Error('Serveris neveikia, pabandykite vėliau.');
            return res.json();
        }).then(res => {
            if (!isSubscribed) return;
            if (res.error) throw new Error(res.error);

            setTimeout(() => {
                setState({
                    loading: false,
                    data: res.data,
                    error: null
                })
            }, 2000);
        }).catch(err => {
            if (!isSubscribed) return;

            setState({
                loading: false,
                data: null,
                error: err.message
            })
        })

        return () => {
            isSubscribed = false;
        }
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
                {
                    state.loading ? <tr><td colSpan={5}>Kraunama</td></tr> :
                        state.error ? <tr><td colSpan={5}>{state.error}</td></tr> :
                            state.data && state.data.length ?
                                state.data.map(({ _id, name, age, email }) =>
                                    <tr key={_id}>
                                        <td>{_id}</td>
                                        <td>{name}</td>
                                        <td>{age}</td>
                                        <td>{email}</td>
                                        <td>
                                            <Button>Redaguoti</Button>
                                            <Button>Ištrinti</Button>
                                        </td>
                                    </tr>
                                ) : <tr><td colSpan={5}>Vartotojai nerasti, pridėkite bent vieną vartotoją.</td></tr>
                }
            </tbody>
        </StyledTable>
    )
};
