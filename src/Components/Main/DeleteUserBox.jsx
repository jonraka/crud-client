import Button from '../UI/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';

const mongodbIdRegex = /^[0-9a-fA-F]{24}$/;

export default function DeleteUserBox({ userId }) {
  const [state, setState] = useState();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const isValidUserId = mongodbIdRegex.test(userId);

  const deleteUser = () => {
    setIsDeleting(true);
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/users`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.error('Nepavyko ištrinti arba vartotojas nebeegzistuoja');
        } else if (res.success) {
          toast.success('Vartotojas ištrintas');
        }
        navigate('/users', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Nepavyko išsiūsti užklausos');
        navigate('/users', { replace: true });
      });
  };

  useEffect(() => {
    let isSubscribed = true;
    if (isValidUserId) {
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/users/${userId}`)
        .then((res) => res.json())
        .then((res) => {
          if (!isSubscribed) return;
          if (res.error) {
            toast.error('Vartotojas nerastas');
            navigate('/users', { replace: true });
          } else if (res.data) {
            setState(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return () => {
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isValidUserId) {
    return <h1>Netinkamas vartotojo identifikatorius</h1>;
  }

  return (
    <>
      <h2>Ar tikrai norite ištrinti vartotoją</h2>
      <div>
        Identifikatorius: {userId}
        {state && ` | Vardas: ${state.name} | El. paštas: ${state.email}`}
      </div>
      <div>
        <Button disabled={isDeleting} onClick={deleteUser}>
          Taip
        </Button>
        <Button onClick={() => navigate('/users', { replace: true })}>
          Ne
        </Button>
      </div>
    </>
  );
}
