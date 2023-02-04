import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/categorias', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((result) => {
            result.json().then((res) => {
                setCategories(res.categorias)
            })
        }).catch((err) => console.log(err))
    }, [])

    return (
        <form className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
            />
            <Input 
                type="number" 
                text="Orcamento do Projeto" 
                name="budget" 
                placeholder="Insira o orcamento total"
            />
            <Select name="category_id" text="Selecione a categoria" options={categories}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm