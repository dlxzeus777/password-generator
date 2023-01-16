import React, { useState } from 'react'
import { AiFillThunderbolt } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid';
import { CopyToClipboard } from "react-copy-to-clipboard";

const Password = () => {

    const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', '!', '@', '$', '%', 'k', 'l', 'm', 'n', 'o', 'p', '2', '4', '6', '7', '8', '9', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const [length, setLength] = useState()
    const [password, setPassword] = useState([]);
    const [isCopied, setIsCopied] = useState(false);

    const onChange = (e) => {
        setLength(e.target.value)
    }
    let passwordVal = '';

    const onSubmit = (e) => {
        e.preventDefault();
        if (!length) return
        for (let i = 0; i < length; i++) {
            let randomChar = Math.floor(Math.random() * characters.length)
            passwordVal += characters[randomChar]
        }
        setPassword(current => {
            return [...current, { id: uuidv4(), password: passwordVal }]
        })
        setLength('')
    }

    const deletePassword = (id) => {
        setPassword(current => current.filter(pw => {
            return pw.id !== id
        }))
    }

    const clearPasswords = () => {
        setPassword([])
    }

    return (
        <div className='container'>
            <h1>Generate a <br /> <span className='green'>random password</span></h1>
            <h3 className='heading4'>Never use an insecure password again.</h3>
            <form onSubmit={onSubmit}>
                <label htmlFor='password'>Set a password length: </label>
                <input id='password' type='number' onChange={onChange} min="5" max="20" value={length} />
                <button className='generate-btn'><AiFillThunderbolt />Generate Passwords</button>
            </form>
            <div className='passwords-container'>
                {
                    password.map(pass => {
                        return (
                            <>

                                <div className='pass-container'>
                                    <CopyToClipboard
                                        text={pass.password}
                                        onCopy={() => {
                                            setIsCopied(true);
                                            setTimeout(() => {
                                                setIsCopied(false);
                                            }, 2500);
                                        }}>
                                        <p className='password' key={pass.id}>{pass.password}</p>
                                    </CopyToClipboard>
                                    <button className='delete' onClick={() => deletePassword(pass.id)}>X</button>
                                </div>
                            </>
                        )
                    })}
            </div>
            {
                password.length >= 1 &&
                <div className='btn-container'>
                    <button className='generate-btn' onClick={clearPasswords}>Clear All</button>
                </div>
            }
            {isCopied ? (
                <p className="success-msg">Text copied to clipboard</p>
            ) : null}
        </div>
    )
}

export default Password