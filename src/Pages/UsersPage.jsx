import { useEffect, useState } from "react"
import styled from "styled-components";
import { Container } from "react-dom";

const StyledTable = styled.table`
    width: 100%;
    text-align: center;
    table-layout: fixed;

    & td {
        /* width: 25%; */
    }
`;

export default function UsersPage() {
    const [state, setState] = useState({
        loading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        fetch(process.env.REACT_APP_API_ENDPOINT + '/users').then(res => {
            if (res.status === 404) throw new Error('API is offline, try again later');
            return res.json();
        }).then(res => {
            if (res.error) throw new Error(res.error);

            setTimeout(() => {
                setState({
                    loading: false,
                    data: res.data,
                    error: null
                })
            }, 2000);
        }).catch(err => {
            setState({
                loading: false,
                data: null,
                error: err.message
            })
        })
    }, []);

    return (
        <Container>
            <StyledTable>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>age</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {state.loading && <tr><td colSpan={4}>Loading</td></tr>}
                    {state.error && <tr><td colSpan={4}>{state.error}</td></tr>}
                    {state.data && state.data.map(({ _id, name, age, email }) =>
                        <tr key={_id}>
                            <td>{_id}</td>
                            <td>{name}</td>
                            <td>{age}</td>
                            <td>{email}</td>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </Container>
    )
};
