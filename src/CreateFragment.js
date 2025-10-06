import React, { useState } from 'react';
import { createFragment } from './api';

export default function CreateFragment({ onCreated }) {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Creating...');
        try {
            const fragment = await createFragment(text);
            setStatus('Created with ID: ' + fragment.id);
            setText('');
            onCreated();
        } catch (err) {
            console.error(err);
            setStatus('Error creating fragment');
        }
    };

    return (
        <div>
            <h2>Create Fragment</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    rows={4}
                    cols={50}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter fragment text"
                />
                <br />
                <button type="submit">Create</button>
            </form>
            <p>{status}</p>
        </div>
    );
}
