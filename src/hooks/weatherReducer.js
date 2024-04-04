export const initialState = {
  forecast: [],
  minTemperature: [],
  maxTemperature: [],
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_FORECAST':
      return { ...state, forecast: action.payload };
    case 'SET_MIN_TEMPERATURE':
      return { ...state, minTemperature: action.payload };
    case 'SET_MAX_TEMPERATURE':
      return { ...state, maxTemperature: action.payload };
    default:
      return state;
  }
}
