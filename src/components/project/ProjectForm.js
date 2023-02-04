import { useEffect, useState } from 'react'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import styles from './ProjectForm.module.css'

function ProjectForm({handleSubmit, btnText, projectData}) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

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

    const submit = (e) => {
        e.preventDefault()
        //console.log(project);
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name] : e.target.value})
    }

    function handleCategory(e) {
        setProject({ ...project, category: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Nome do Projeto" 
                name="name" 
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
            />
            <Input 
                type="number" 
                text="Orcamento do Projeto" 
                name="budget" 
                placeholder="Insira o orcamento total"
                handleOnChange={handleChange}
            />
            <Select 
                name="category_id" 
                text="Selecione a categoria" 
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category : ''}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm