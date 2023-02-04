import styles from './Select.module.css'

function Select({text, name, options, handleOnChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}: </label>
            <select name={name} id={name}>
                <option>Selecione uma opcao</option>
                {options.map(categoria => {
                    return <option value={categoria._id} key={categoria._id}>{categoria.nome}</option>
                })}
            </select>
        </div>
    )
}

export default Select