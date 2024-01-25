import { useState } from 'react';

const Input = () => {
    const [value, setValue] = useState('');
    
    const onChange = (e) => {
        setValue(e.target.value);
    };
    
    return (
        <input type="text" value={value} onChange={onChange} />
    );
};

export default Input;
