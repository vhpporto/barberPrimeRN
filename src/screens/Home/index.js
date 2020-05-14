import React, {Component} from 'react';
import {
  Platform,
  Animated,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import api from '../../services/api';
import {ContainerLoading} from './styles';
import {API_KEY} from 'react-native-dotenv';
import {connect} from 'react-redux';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      infos: null,
      loading: true,
      imagemEstabelecimento: null,
      apresentacao: null,
      nomeBarbearia: null,
      servicos: null,
    };
  }

  handleInfos = async () => {
    await this.buscaServicos();
    await this.buscaImagens();
    await this.buscaInfos();
  };

  renderInfo = () => {
    return (
      <View style={{width: '100%', alignSelf: 'center'}}>
        <View style={[styles.containerInfo, {backgroundColor: '#000'}]}>
          <Text style={[styles.textTitle, {color: '#FFF', fontWeight: '500'}]}>
            Serviços
          </Text>
          <Text
            style={[
              styles.textTitle,
              {color: '#FFF', fontSize: 16, fontWeight: '400'},
            ]}>
            Escolhe o serviço e agende seu horário
          </Text>
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.servicos}
            renderItem={({item}) => {
              return (
                <View style={styles.containerService}>
                  <Image source={{uri: item.Ser_Figura}} style={styles.image} />
                  <Text style={styles.textServicoTitle} numberOfLines={2}>
                    {item.Ser_Descricao}
                  </Text>
                  <Text
                    style={[
                      styles.textServicoTitle,
                      {fontSize: 10, textAlign: 'left', marginTop: 5},
                    ]}
                    numberOfLines={3}>
                    {item.Ser_Observacao}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.textTitle}>A barbearia</Text>
          <Text style={styles.textInfo}>{this.state.apresentacao}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.textTitle}>Endereço</Text>
          <Text style={styles.textInfo}>{this.state.infos[0].Endereco}</Text>
        </View>
        <View style={styles.containerInfo}>
          <Text style={styles.textTitle}>Contato</Text>
          <Text style={styles.textInfo}>{this.state.infos[0].PAJ_Celular}</Text>
          <Text style={styles.textInfo}>
            {this.state.infos[0].PAJ_Telefone}
          </Text>
        </View>
      </View>
    );
  };

  componentDidMount() {
    this.handleInfos();
  }

  buscaServicos = async () => {
    const response = await api.get(
      `/servicos/?api_key=${API_KEY}&id=${this.props.id}&dia=${14}&tipo=4`,
    );
    const {result} = response.data;
    this.setState({servicos: result});
    console.log(this.state.servicos);
  };

  buscaImagens = async () => {
    const response = await api.get(
      `https://api.appbarber.com.br/pessoaImagem?api_key=${API_KEY}&id=${this.props.id}&codigo=${this.props.pesCodigoEmpresa}&tipo=1`,
    );
    const {result} = response.data;
    this.setState({imagemEstabelecimento: result[0].PIm_Imagem});
  };

  buscaInfos = async () => {
    const response = await api.get(
      `apresentacao?api_key=${API_KEY}&codigo=${this.props.pesCodigoEmpresa}&tipo=1`,
    );
    const {result} = response.data;
    this.setState({
      infos: result,
      apresentacao: result[0].PAJ_Apresentacao,
      nomeBarbearia: result[0].Pes_Nome,
      loading: !this.state.loading,
    });
  };

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const titleScale = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0.8],
      extrapolate: 'clamp',
    });
    const titleTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    if (this.state.loading) {
      return (
        <ContainerLoading>
          <ActivityIndicator />
        </ContainerLoading>
      );
    }

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}>
          {this.renderInfo()}
        </Animated.ScrollView>
        <Animated.View
          pointerEvents="none"
          style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={{uri: this.state.imagemEstabelecimento || ''}}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [{scale: titleScale}, {translateY: titleTranslate}],
            },
          ]}>
          <Text style={styles.title}>{this.state.nomeBarbearia}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 4,
    shadowRadius: 3.84,

    elevation: 5,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInfo: {
    // backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderColor: '#d8d8d8',
    // padding: 20,
    // borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.3,
    // shadowRadius: 3.84,

    // elevation: 5,
  },
  textTitle: {
    alignSelf: 'flex-start',
    margin: 10,
    color: '#555',
    fontSize: 24,
    fontWeight: 'bold',
  },
  textInfo: {
    color: '#888',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 14,
  },
  containerService: {
    margin: 10,
    height: 290,
    width: 210,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '75%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textServicoTitle: {
    paddingLeft: 5,
    color: '#555',
    fontWeight: '400',
  },
});

const mapStateToProps = ({user}) => {
  console.log(user);
  return {
    id: user.id,
    pesCodigoEmpresa: user.pesCodigoEmpresa,
  };
};

export default connect(mapStateToProps, null)(index);
