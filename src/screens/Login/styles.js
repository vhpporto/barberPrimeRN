import styled from 'styled-components/native';
// import {ActivityIndicator} from 'react-native';
export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContainerLoading = styled.View`
  /* flex: 1; */
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  background-color: #000;
  opacity: 0.5;
  justify-content: center;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const InputEmail = styled.TextInput`
  height: 40px;
  width: 90%;
  margin: 10px;
  border-radius: 4px;
  padding-left: 15px;
  background-color: #fff;
`;
export const InputPassword = styled.TextInput`
  height: 40px;
  width: 90%;
  border-radius: 4px;
  padding-left: 15px;
  background-color: #fff;
`;

export const ButtonLogin = styled.TouchableOpacity`
  height: 40px;
  width: 90%;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  background-color: orange;
  margin-top: 10px;
`;

export const TextButton = styled.Text`
  color: #fff;
`;
