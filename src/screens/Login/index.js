import React, {useState} from 'react';
import {ActivityIndicator, Alert} from 'react-native';
import {
  Container,
  Form,
  InputEmail,
  InputPassword,
  ButtonLogin,
  TextButton,
} from './styles';
import api from '../../services/api';
import md5 from 'md5';
import {ContainerLoading} from './styles';
import {API_KEY} from 'react-native-dotenv';

const Login = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    id: null,
    erro: null,
    resultado: null,
    tprCodigo: null,
    usuNome: null,
    usuImagem: null,
    pesCodigoEmpresa: null,
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    setLoading(true);
    await login();
  };

  const login = async () => {
    const response = await api.post('/loginv2', {
      api_key: API_KEY,
      email: user.email,
      senha: md5(user.password),
      pescodigo: '882438',
    });

    const {
      result,
      result: [
        {id, resultado, erro, tprCodigo, pesCodigoEmpresa, usuImagem, usuNome},
      ],
    } = response.data;
    console.log(result);
    setUser({
      id,
      erro,
      resultado,
      tprCodigo,
      usuNome,
      usuImagem,
      pesCodigoEmpresa,
    });
    setLoading(false);
    if (erro == 0) {
      navigation.navigate('Home');
    } else if (erro == 1) {
      Alert.alert(`${resultado}`, '');
    }
  };

  return (
    <Container>
      {loading && (
        <ContainerLoading>
          <ActivityIndicator size="large" />
        </ContainerLoading>
      )}
      <Form>
        <InputEmail
          placeholder="Email"
          clearButtonMode="while-editing"
          value={user.email}
          onChangeText={(email) => setUser({...user, email})}
        />
        <InputPassword
          placeholder="Password"
          clearButtonMode="while-editing"
          secureTextEntry={true}
          value={user.password}
          onChangeText={(password) => setUser({...user, password})}
        />
        <ButtonLogin onPress={handleLogin}>
          <TextButton>Acessar</TextButton>
        </ButtonLogin>
      </Form>
    </Container>
  );
};

export default Login;
