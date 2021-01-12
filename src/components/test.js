function fruitReducer(state, action) {
    switch (action.type) {
        case 'add_apple':
          return { ...state, apples: state.apples + 1 };
        case 'add_banana':
          return { ...state, bananas: state.bananas + 1 };
        case 'remove_apple':
          return { ...state, apples: state.apples - 1 };
        case 'remove_banana':
          return { ...state, bananas: state.bananas - 1 };
        default:
          throw new Error("Unhandled action type.");
        }
}