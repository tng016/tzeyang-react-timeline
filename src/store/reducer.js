import * as actionTypes from "./actions";

const initialState = {
  toggles: {}
};

function initialiseToggles(data) {
  data.forEach(event => {
    initialState.toggles[event.timestamp] = false;
  });
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.TOGGLE_EVENT_EXPAND:
      let newToggles = Object.assign({}, state.toggles);
      newToggles[action.timestamp] = !newToggles[action.timestamp];

      return {
        ...state,
        toggles: newToggles
      };
  }
  return state;
}

export default { reducer, initialiseToggles };
