import React, {
  useCallback,
  useReducer,
  createContext,
  useContext,
} from 'react';

type ActionType =
  | { type: 'ADD'; text: string }
  | { type: 'REMOVE'; id: number }
  | { type: 'DONE'; id: number };

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => undefined,
  removeTodo: () => undefined,
  checkTodo: () => undefined,
});

function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  checkTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case 'ADD':
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case 'REMOVE':
        return state.filter(({ id }) => id !== action.id);
      case 'DONE': {
        const item = state.find(({ id }) => id === action.id);
        console.log('item1', item);
        if (item) {
          item.done = true;
        }
        return [...state];
      }
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback((text: string) => {
    dispatch({
      type: 'ADD',
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({
      type: 'REMOVE',
      id,
    });
  }, []);

  const checkTodo = useCallback((id: number) => {
    dispatch({
      type: 'DONE',
      id,
    });
  }, []);

  return { todos, addTodo, removeTodo, checkTodo };
}

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useTodos = (): Todo[] => {
  const { todos } = useContext(TodoContext);
  return todos;
};

export const useAddTodo = (): UseTodosManagerResult['addTodo'] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult['removeTodo'] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};

export const useCheckTodo = (): UseTodosManagerResult['checkTodo'] => {
  const { checkTodo } = useContext(TodoContext);
  return checkTodo;
};
