import { useState } from 'react'

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });
            const result = await response.json();
            console.log(result);
            setSuccess(result.message);
            setToken(result.token);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input type='text' required='required' minLength='5' maxLength='20' value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: <input type='password' required='required' minLength='8' maxLength='20' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button id='submit-button' type='submit'>Submit!</button>
                {success && <p>{success}</p>}
            </form>
        </>
    )
}