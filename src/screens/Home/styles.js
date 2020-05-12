import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 20px;
`;
export const ContainerLoading = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  height: 100px;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const LogoUser = styled.Image`
  height: 50px;
  width: 50px;
  margin-top: 30px;
  border-radius: 25px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 27px;
  align-self: flex-start;
  margin-top: 15px;
`;

export const ContainerScroll = styled.ScrollView``;

export const ContainerCard = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 20px;
`;

export const TextNomeBarbearia = styled.Text`
  font-size: 27px;
  text-align: left;
  font-weight: bold;
  color: #020200;
`;

export const ContainerServices = styled.View`
  border-width: 0.5px;
  border-color: #ececec;
  height: 150px;
  width: 125px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #fff;
  align-items: center;
  margin-right: 20px;
  shadow-color: #000;
  shadow-off-set: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.15px;
  shadow-radius: 6px;
  elevation: 3;
`;

export const ButtonServico = styled.TouchableOpacity;

export const ImageService = styled.Image`
  height: 60%;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const TextServico = styled.Text`
  color: #888;
  font-weight: 500;
  margin-top: 15px;
  font-size: 12px;
  text-align: center;
`;

export const ContainerInfo = styled.View`
  width: 100%;
  padding: 20px;
  shadow-color: #000;
  background-color: #fff;
  align-self: center;
  border-radius: 10px;
  shadow-off-set: {
    width: 0;
    height: 2;
  }
  shadow-opacity: 0.15px;
  shadow-radius: 6px;
  elevation: 3;
`;

export const TextInfos = styled.Text`
  font-weight: 500;
  color: #999;
  text-align: center;
`;

export const Logo = styled.Image`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  align-self: center;
  border-width: 1px;
  margin-bottom: 15px;
`;
