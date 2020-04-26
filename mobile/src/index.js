import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, Text, Stylesheet, StatusBar, FlatList, TouchableOpacity } from 'react-native';

import api from './services/api';

export default function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Novo projeto React Native [${Date.now()}]`,
            owner: 'ALLS'
        });

        setProjects([ ...projects, response.data]);
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#333" />
            
            {/* Container para exibir o conteúdo na área visível da aplicação (não deixa o conteúdo atrás da statusbar) */}
            <SafeAreaView>
                {/* Componente utilizado para criar lista com scrollbar */ }
                <FlatList 
                    style={styles.container}
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item : project }) => (
                        <Text style={style.project}>{project.title}</Text>
                    )}            
                />

                <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.6}
                    onPress={handleAddProject}
                >
                    <Text style={styles.buttonText}>Adicionar Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>

            {/*<View style={styles.container}>
                {projects.map(project => (
                    <Text style={style.project} key={project.id}>{project.title}</Text>
                ))}                
            </View>*/}
        </>
    );
}

// * Define a variável que conterá os estilos CSS
// * No React Native não há herança de estilos, para cada componente deverá ser criado um estilo próprio
const styles = Stylesheet.create({
    // * O nome das propriedades dentro de 'style' pode ser qualquer um
    container: {
        // * Os estilos CSS no React Native são escritos em Camel Case
        backgroundColor: '#333',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#99bb22',
        fontSize: 12,
        fontWeight: 'bold'
    },
    project: {
        color: '#fff',
        fontSize: 16
    },
    button: {

    },
    buttonText: {
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});