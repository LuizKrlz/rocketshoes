/**
 * Todo reducer recebe por padrao duas variaveis que sao o state e action
 *  state -> é o estado anterior, antes de fazermos a nossa alteração
 *  action -> é a action disparada
 *
 * estado do redux é imutavel
 */

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.product];

    default:
      return state;
  }
}
