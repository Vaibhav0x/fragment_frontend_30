import React, { useState, useEffect } from 'react';
import { listFragments, getFragmentData } from './api';

export default function FragmentList() {
    const [fragments, setFragments] = useState([]);
    const [selected, setSelected] = useState(null);
    const [content, setContent] = useState('');

    const fetchFragments = async () => {
        const ids = await listFragments();
        setFragments(ids);
    };

    const viewFragment = async (id) => {
        const data = await getFragmentData(id);
        setSelected(id);
        setContent(data);
    };

    useEffect(() => {
        fetchFragments();
    }, []);

    return (
        <div>
            <h2>Fragments</h2>
            <ul>
                {fragments.map((id) => (
                    <li key={id}>
                        {id} <button onClick={() => viewFragment(id)}>View</button>
                    </li>
                ))}
            </ul>
            {selected && (
                <div>
                    <h3>Fragment {selected}</h3>
                    <pre>{content}</pre>
                </div>
            )}
        </div>
    );
}
