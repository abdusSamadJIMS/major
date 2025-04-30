'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLogin() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async () => {
        const res = await fetch('/api/admin-auth', {
            method: 'POST',
            body: JSON.stringify({ password }),
        });

        if (res.ok) {
            router.push('/complaint-list');
        } else {
            setError('Invalid password');
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="p-6 border rounded shadow-md">
                <h1 className="text-xl font-bold mb-4">Admin Login</h1>
                <input
                    type="password"
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full mb-4"
                />
                <button onClick={handleLogin} className="btn btn-primary w-full">Login</button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
        </main>
    );
}
