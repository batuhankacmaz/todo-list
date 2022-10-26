import React from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { CiCircleRemove } from 'react-icons/ci';
import { useTodos, useRemoveTodo } from '../../useTodos';
import '../../assets/TodoListStyle.scss';

const Heading = ({
  className,
  title,
}: {
  className: string;
  title: string;
}) => <h2 className={className}>{title}</h2>;

function TodoListItem({
  itemName,
  isChecked,
}: {
  itemName: string;
  isChecked: boolean;
}) {
  const removeTodo = useRemoveTodo();
  return (
    <div className="item_container">
      <div className="first_element">
        <BiCheckCircle className="check_icon" size="25px" />
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
  return (
    <div className="card_container">
      <Heading className="header" title="Todo List" />
      <UL
        listClassName="list"
        itemClassName="item"
        items={todos}
        itemClick={() => undefined}
        render={(todo) => (
          <TodoListItem itemName={todo.text} isChecked={todo.done} />
        )}
      />
    </div>
  );
}

export default TodoList;
