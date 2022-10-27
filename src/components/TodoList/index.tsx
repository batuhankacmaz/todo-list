import React, { useCallback, useRef, useState, useEffect } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { CiCircleRemove } from 'react-icons/ci';
import { useTodos, useRemoveTodo, useCheckTodo } from '../../context/useTodos';
import '../../assets/TodoListStyle.scss';

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const Heading = ({
  className,
  title,
}: {
  className: string;
  title: string;
}) => <h2 className={className}>{title}</h2>;

function TodoListItem({
  itemName,
  id,
  isChecked,
}: {
  itemName: string;
  id: number;
  isChecked: boolean;
}) {
  const removeTodo = useRemoveTodo();
  const checkTodo = useCheckTodo();
  return (
    <div className={isChecked ? 'item_container_checked' : ' item_container'}>
      <div className="first_element">
        <BiCheckCircle
          className="check_icon"
          size="25px"
          onClick={() => checkTodo(id)}
        />
        <span className="item_name">{itemName}</span>
      </div>
    </div>
  );
}

function UL<T>({
  listClassName,
  itemClassName,
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  listClassName: string;
  itemClassName: string;
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul className={listClassName}>
      {items.map((item, index) => (
        <li
          className={itemClassName}
          onClick={() => itemClick(item)}
          key={index}
        >
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function TodoList() {
  const todos = useTodos();
  const [filteredName, filteredNameSet] = useState<string>('');
  const [filteredTodos, filteredTodosSet] = useState<Todo[]>([]);

  console.log('filteredName', filteredName);

  const handleChange = (name: string) => {
    filteredNameSet(name);
  };

  const filterTodos = useCallback(() => {
    if (filteredName === '') return todos;
    else {
      return todos.filter((todo) =>
        todo.text.toLowerCase().includes(filteredName.toLowerCase())
      );
    }
  }, [todos, filteredName]);

  useEffect(() => {
    const currentFilteredTodos = filterTodos();
    filteredTodosSet(currentFilteredTodos);
  }, [filterTodos]);

  return (
    <div className="card_container">
      <Heading className="header" title="Todo List" />
      <input
        className="filter_container"
        placeholder="search your todo..."
        type="text"
        value={filteredName}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      <UL
        listClassName="list"
        itemClassName="item"
        items={filteredTodos}
        itemClick={() => undefined}
        render={(todo) => (
          <TodoListItem
            itemName={todo.text}
            isChecked={todo.done}
            id={todo.id}
          />
        )}
      />
    </div>
  );
}

export default TodoList;
