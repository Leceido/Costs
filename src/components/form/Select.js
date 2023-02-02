import { useState } from 'react';
import styles from './Select.module.css'

function Select({text, name, options, handleOnChange, value}) {

    const [categories, setCategories] = useState()

    function chooseOption(e) {
        fetch("http://localhost:5000/categorias", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
            console.log(categories.categorias);
        })
        .catch((err) => console.log(err))
    }

    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}: </label>
            <select name={name} id={name} onClick={chooseOption}>
                
            </select>
        </div>
    )
}

export default Select