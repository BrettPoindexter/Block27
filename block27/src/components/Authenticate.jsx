import { useState } from 'react'

export default function Authenticate({ token }) {
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [user, setUser] = useState('');

    async function handleClick() {
        try {
            const response = await fetch(`https://fsa-jwt-practice.herokuapp.com/authenticate`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log(result);
            setSuccessMessage(result.message);
            setUser(result.data.username);
        } catch (error) {
            setError(error.message);
        }
    }

    console.log(successMessage);
    return (
        <>
            <h2>Authenticate!</h2>
            <button onClick={handleClick}>Authenticate Token!</button>
            {error && <p>{error}</p>}
            {successMessage && <p>
                {successMessage} <br />
                Thanks for authenticating {user}!</p>}
        </>
    )
}