import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import api from './services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  text: {
    fontSize: 32,
    color: '#FFF',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FFF',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#7159c1',
    fontSize: 18,
  },
});

export default function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    api.get('/projects').then((res) => {
      setProjects(res.data);
    });
  }, []);

  async function handleAddProject() {
    const res = await api.post('/projects', {
      title: 'Projeto novo React Navite',
      owner: 'Alisson Kendi Kohatsu',
    });
    setProjects([...projects, res.data]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={projects}
          keyExtractor={(project) => String(project.id)}
          renderItem={({item: project}) => (
            <Text style={styles.text}>{project.title}</Text>
          )}
        />

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.7}
          onPress={handleAddProject}>
          <Text style={styles.buttonText}>ADICIONAR</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}
