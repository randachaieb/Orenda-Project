import { GET_CARDS, FILTER_CARDS_BY_TITLE, FILTER_CARDS_BY_REGION, FILTER_CARDS_BY_CATEGORY } from "../actions/ActionTypes";

const initState = {
  cards: [], TitleString:"", RegionString:"", CategoryString:"All"};

const cardReducer = (state = initState, action) => {
  switch (action.type) {
    
    case GET_CARDS:
      
      return {
        ...state,
        cards: action.payload
      };

    case FILTER_CARDS_BY_REGION: return {
        ...state, RegionString: action.payload
      }

    case FILTER_CARDS_BY_TITLE: return {
        ...state, TitleString: action.payload
    }

    case FILTER_CARDS_BY_CATEGORY: return {
    ...state, CategoryString: action.payload
  }

    default:
      return state;
  }
};

export default cardReducer