import React, { useRef, useCallback } from 'react';

import { CiCircleRemove } from 'react-icons/ci';
import {
  useTodos,
  useAddTodo,
  useRemoveTodo,
  TodosProvider,
} from '../../useTodos';
import '../../assets/OperationalStyle.scss';

const Heading = ({
  className,
  title,
}: {
  className: string;
  title: string;
}) => <h2 className={className}>{title}</h2>;

function TodoListItem({ itemName, id }: { itemName: string; id: number }) {
  const removeTodo = useRemoveTodo();
  return (
    <div className="item_container">
      <div className="first_element">
        <span className="item_name">{itemName}</span>
      </div>

      <CiCircleRemove
        className="remove_icon"
        onClick={() => removeTodo(id)}
        size="25px"
      />
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

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string; children: React.ReactNode }
  // eslint-disable-next-line react/prop-types
> = ({ title, children, ...rest }) => (
  <button {...rest}>{title ?? children}</button>
);

function Operational() {
  const todos = useTodos();
  const addTodo = useAddTodo();
  const removeTodo = useRemoveTodo();

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = '';
    }
  }, [addTodo]);
  return (
    <div className="card_container">
      <Heading className="header" title="Operational" />
      <UL
        listClassName="list"
        itemClassName="item"
        items={todos}
        itemClick={(item) => alert(item.id)}
        render={(todo) => <TodoListItem itemName={todo.text} id={todo.id} />}
      />
      <div className="add_todo_container">
        <input type="text" ref={newTodoRef} />
        <Button className="add_button" onClick={onAddTodo}>
          Add Todo
        </Button>
      </div>
    </div>
  );
}

export default Operational;
