import { View, Text, TextInput, StyleSheet, ActivityIndicator, Button, findNodeHandle} from 'react-native';
import React, {useState} from 'react';
import { AUTHENTICATION } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const Entrar = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [carregar, setCarregar] = useState(false);
    const auth = AUTHENTICATION;


    const signIn = async () => { 
        setCarregar(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, senha);
            console.log(response);
            alert("Entrando...")
        }catch (error: any){
            console.log(error);
            alert('Registro falhou: '+ error.message)
        }finally {
            setCarregar(false);
        }
    }

    const signUp = async () => {
        setCarregar(true);
        try{
            const response = await createUserWithEmailAndPassword(auth, email, senha);
            console.log(response);
            alert("Cadastrado")
        }catch(error: any){
            console.log(error);
            alert('Registro Falhou: '+ error.message)
        }finally{
            setCarregar(false);
        }
        
    }

    return (
        <View style= {styles.container}>
            <TextInput  style = {styles.input} value={email} placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput  style = {styles.input} secureTextEntry={true} value={senha} placeholder='Password' autoCapitalize='none' onChangeText={(text) => setSenha(text)}></TextInput>
            
             { carregar ? <ActivityIndicator size = "large" color='#000ff'/>
             : <>
             <Button title='Entrar' onPress={signIn}/>
             <Button title='Criar conta' onPress={signUp}/>
             </>}
        </View>
    )
}

export default Entrar;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24, 
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f0f0f0', 
        alignItems: 'center' 
    },
    input: {
        marginVertical: 8,
        height: 40, 
        width: '80%', 
        borderWidth: 2,
        borderRadius: 8,
        padding: 12, 
        backgroundColor: '#fff',
        borderColor: '#007bff',
        fontSize: 16, 
        color: '#333' 
    }
});
