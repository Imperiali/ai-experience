const nj = require('numjs');

class MonteCarloTreeSearchNode {
  constructor(state, parent=null, parent_action=null) {
    this.state = state
    this.parent = parent
    this.parent_action = parent_action
    this.children = []
    this._number_of_visitis = 0
    this._results = []
    this._results[1] = 0
    this._results[-1]= 0
    this._untried_actions = null
    this._untried_actions = this.untried_actions()
  }

  untried_actions() {
    this._untried_actions = this.state.get_legal_actions()
    return this._untried_actions
  }

  q() {
    let wins = this._results[1]
    let loses = this._results[-1]
    return wins - loses
  }

  n() {
    return this._number_of_visitis
  }

  expand() {
    let action = this._untried_actions.pop()
    let next_state = this.state.move(action)
    let child_node = new MonteCarloTreeSearchNode(next_state, this, action)
    this.children.push(child_node)
    return child_node
  }

  is_terminal_node() {
    return this.state.is_game_over()
  }

  rollout() {
    let current_rollout_state = this.state

    while (!current_rollout_state.is_game_over()) {
      let possible_moves = current_rollout_state.get_legal_actions()

      let action = this.rollout_policy(possible_moves)
      current_rollout_state = current_rollout_state.move(action)
    }

    return current_rollout_state
  }

  backpropagate(result) {
    this._number_of_visitis += 1
    this._results[result] += 1
    if (this.parent) {
      this.parent.backpropagate(result)
    }
  }

  is_fully_expanded() {
    return this._untried_actions.length === 0
  }

  _argMax(array) {
    return [].reduce.call(array, (m, c, i, arr) => c > arr[m] ? i : m, 0)
  }

  best_child(c_param= 0.1) {
    let choices_weights = this.children.map((child) => {
      return (child.q() / child.n()) + c_param * nj.sqrt((2 * nj.log(this.n()) / child.n()))
    })
    return this.children[this._argMax(choices_weights)]
  }

  rollout_policy(possible_moves) {
    return possible_moves[Math.floor(Math.random() * (possible_moves.length + 1))]
  }

  _tree_policy() {
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

  best_action() {
    let simulation_no = 100

    simulation_no.map(() => {
      let v = this._tree_policy()
      let reward = v.rollout()
      v.backpropagate(reward)
    })

    return this.best_child(0.)
  }

  get_legal_actions() {
    //
    //     '''
    //     Modify according to your game or
    //     needs. Constructs a list of all
    //     possible actions from current state.
    //     Returns a list.
    //     '''
    //
  }

  is_game_over() {
    /*
    '''
    Modify according to your game or
    needs. It is the game over condition
    and depends on your game. Returns
    true or false
    '''
    * */
  }

  game_result() {
    /*
        '''
    Modify according to your game or
    needs. Returns 1 or 0 or -1 depending
    on your state corresponding to win,
    tie or a loss.
    '''
     */
  }

  move(action) {
    /*
        '''
    Modify according to your game or
    needs. Changes the state of your
    board with a new value. For a normal
    Tic Tac Toe game, it can be a 3 by 3
    array with all the elements of array
    being 0 initially. 0 means the board
    position is empty. If you place x in
    row 2 column 3, then it would be some
    thing like board[2][3] = 1, where 1
    represents that x is placed. Returns
    the new state after making a move.
    '''
     */
  }

  main() {
    let root = new MonteCarloTreeSearchNode()
    let selected_node = root.best_action()
  }
}
