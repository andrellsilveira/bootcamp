import React, { useState, useEffect } from 'react';

import api from './services/api';

import './App.css';
import backgroundImage from './assets/fundo.png';
import Header from './components/Header';

export default function App() {
    /**
     * Conceito de ESTADO
     * Inicializar o estado com o mesmo tipo que será utilizado para a variável
     */
    const [projects, setProjects] = useState([]);

    /**
     * Utilizado para disparar funções assim que a página é carregada
     * Recebe dois parâmetros:
     * 1. A função que será disparada
     * 2. Quando a função deve ser disparada
     * Por exemplo:
     * - Se quiser que dispare ao alterar a variável "projects", coloca-se [projects]
     * - Se quiser que dispare ao renderizar o componente, coloca-se []
     */
    useEffect(() => {
        /**
         * Não é necessário colocar a / antes do recurso
         * pois o Axios detecta e insere automaticamente
         * se for necessário
         */
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    /**
     * useState retorna um array com 2 posições
     * 1. Variável com o ser valor inicial
     * 2. Função para atualizarmos esse valor
     */

    async function handleAddProject() {
        //projects.push(`Novo projeto ${Date.now()}`);

        // * Conceito de IMUTABILIDADE
        /**
         * Cria um novo array copiando o array já existente utilizando o "spread operator ..." 
         * e adiciona o novo valor
         */
        //setProjects([ ... projects, `Novo projeto ${Date.now()}`]);

        /**
         * Envia requisição POST para a API e recupera o projeto criado
         */
        const response = await api.post('projects', {
            title: `Novo projeto utilizando a API [${Date.now()}]`,
            owner: "Ambrósio Conrado"
        });

        // * Adiciona o projeto para uma nova variável
        const project = response.data;

        // * Adiciona o novo projeto ao array de projetos
        setProjects([ ... projects, project]);
    }

    return (
        <>
            <Header title="Projects" />

            <img width="300" src={backgroundImage} />
            <ul>
                {/**
                 * O primeiro item HTML de uma iteração com o "map" deve receber o atributo "key" para identificar cada item da lista
                 */}
                {projects.map(project => <li key={project.id}>{project.title}</li>)}
                {/**
                 * Existem outras duas formas de exibir o código HTML através da instrução "map":
                 * {projects.map(project => return (
                 *      <li key={project}>{project}</li>
                 * ))}
                 * -- ou --
                 * {projects.map(project => {
                 *      return <li key={project}>{project}</li>                 * 
                 * })}
                 */}
            </ul>
            
            <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
        </>
    );
}