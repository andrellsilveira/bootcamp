/**
 * Importando a biblioteca React
 * Todos os arquivos dentro de um projeto React que façam
 * a utilização de JSX deverão ter essa biblioteca importada
 */
import React from 'react';
/**
 * Importa a função "render" da biblioteca React-DOM (ReactJS)
 */
import { render } from 'react-dom';

/**
 * Importa o componente App
 */
import App from './App';

/**
 * Renderiza o HTML dentro da "div" com id "app" no arquivo "public/index.html"
 */
render(<App />, document.getElementById('app'));