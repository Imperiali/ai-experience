import nj from 'numjs';
import {useSuperBoard} from "../hooks/superBoard";

export const MonteCarloTreeSearchNode = () => {
  function init(state, parent=null, parent_action=null) {
    this.state = state
    this.parent = parent
    this.parent_action = parent_action
    this.children = []
    this._number_of_visitis = 0
    this._results = []
    this._results[1] = 0
    this._results[-1] = 0
    this._untried_actions = null
    this._untried_actions = untried_actions()
    this.endGame = false
  }

  function untried_actions() {
    this._untried_actions = this.state.get_legal_actions()
    return this._untried_actions
  }

  function q() {
    let wins = this._results[1]
    let loses = this._results[-1]
    return wins - loses
  }

  function n() {
    return this._number_of_visitis
  }

  function expand() {
    let action = this._untried_actions.pop()
    let next_state = this.state.move(action)
    let child_node = new MonteCarloTreeSearchNode(next_state, this, action)
    this.children.push(child_node)
    return child_node
  }

  function is_terminal_node() {
    return this.state.is_game_over()
  }

  function rollout() {
    let current_rollout_state = this.state

    while (!current_rollout_state.is_game_over()) {
      let possible_moves = current_rollout_state.get_legal_actions()

      let action = this.rollout_policy(possible_moves)
      current_rollout_state = current_rollout_state.move(action)
    }

    return current_rollout_state
  }

  function backpropagate(result) {
    this._number_of_visitis += 1
    this._results[result] += 1
    if (this.parent) {
      this.parent.backpropagate(result)
    }
  }

  function is_fully_expanded() {
    return this._untried_actions.length === 0
  }

  function _argMax(array) {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
  }

  function best_child(c_param= 0.1) {
    let choices_weights = this.children.map((child) => {
      return (child.q() / child.n()) + c_param * nj.sqrt((2 * nj.log(this.n()) / child.n()))
    })
    return this.children[_argMax(choices_weights)]
  }

  function rollout_policy(possible_moves) {
    return possible_moves[Math.floor(Math.random() * (possible_moves.length + 1))]
  }

  function _tree_policy() {
    let current_node = this
    while (!current_node.is_terminal_node()) {
      if (!current_node.is_fully_expanded()){
        return current_node.expand()
      } else {
        current_node = current_node.best_child()
      }
    }
    return current_node
  }

  function best_action() {
    let simulation_no = 100

    simulation_no.map(() => {
      let v = _tree_policy()
      let reward = v.rollout()
      v.backpropagate(reward)
    })

    return best_child(0.)
  }

  function get_legal_actions() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { availableMoves } = useSuperBoard()

    return availableMoves
  }

  function is_game_over() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { endGame } = useSuperBoard()

    return endGame
  }

  // function game_result() {
  //   /*
  //       '''
  //   Modify according to your game or
  //   needs. Returns 1 or 0 or -1 depending
  //   on your state corresponding to win,
  //   tie or a loss.
  //   '''
  //    */
  // }

  function move(action) {
    let [ boardId, squareId ] = action

    return [boardId, squareId]
  }

  // main() {
  //   let root = new MonteCarloTreeSearchNode()
  //   let selected_node = root.best_action()
  // }

  return {
    init,
    q,
    n,
    expand,
    untried_actions,
    is_terminal_node,
    rollout,
    backpropagate,
    is_fully_expanded,
    best_child,
    rollout_policy,
    best_action,
    get_legal_actions,
    is_game_over,
    // game_result,
    move
  }
}
