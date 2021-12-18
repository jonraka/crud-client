import { useEffect, useState } from "react"
import config from '../config.json';

export default function UsersPage() {
    const [data, setData] = useState({
        loading: true,
        data: null,
        error: null
    })

    useEffect(() => {
        fetch(config.api_endpoint + '/users').then(res => {
            if (res.status === 404) throw new Error('API is offline, try again later');
            return res.json();
        }).then(res => {
            if (res.error) throw new Error(res.error);

            setData({
                loading: false,
                data: res.data,
                error: null
            })
        }).catch(err => {
            setData({
                loading: false,
                data: null,
                error: err.message
            })
        })
    }, []);

    return <div><pre>{JSON.stringify(data, null, 4)}</pre></div>
};
