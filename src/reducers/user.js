import {USER_LOGGED_IN} from '../actions/types';

const INITIAL_STATE = {
  id: null,
  email: null,
  usuNome: null,
  usuImagem: null,
  pesCodigoEmpresa: null,
  tprCodigo: null,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        usuNome: action.payload.usuNome,
        usuImagem: action.payload.usuImagem,
        pesCodigoEmpresa: action.payload.pesCodigoEmpresa,
        tprCodigo: action.payload.tprCodigo,
      };
    default:
      return state;
  }
};

export default user;
