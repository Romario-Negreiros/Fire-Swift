import React from 'react';

import { Container } from './styles';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Data {
  name: string;
}

interface Props {
  title: string;
  userData: Data[];
  data: Data[];
}

const DraggableList: React.FC<Props> = ({ title, userData, data }) => {
  const [options, setOptions] = React.useState(data);
  const [userList, setUserList] = React.useState(userData);

  const setNewOrder = (options: Data[], userList: Data[]) => {
    setOptions(options);
    setUserList(userList);
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    const leftColumn = [...options];
    const rightColumn = [...userList];
    if (source.droppableId === 'userList') {
      const [splicedItem] = rightColumn.splice(source.index, 1);
      leftColumn.splice(destination.index, 0, splicedItem);
    } else if (source.droppableId === 'options') {
      const [splicedItem] = leftColumn.splice(source.index, 1);
      rightColumn.splice(destination.index, 0, splicedItem);
    }
    setNewOrder(leftColumn, rightColumn);
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: isDragging ? '#4a2975' : 'initial',

    ...draggableStyle,
  });

  return (
    <Container>
      <h1>{title}</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="options">
          {provided => (
            <ul className="options" {...provided.droppableProps} ref={provided.innerRef}>
              {provided.placeholder}
              {options.map((item, i) => {
                if (userData.some(userItem => item.name === userItem.name)) return null;
                else {
                  return (
                    <Draggable
                      key={`${item.name}-${i}`}
                      draggableId={`${item.name}-${i}`}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          <span>{item.name}</span>
                        </li>
                      )}
                    </Draggable>
                  );
                }
              })}
            </ul>
          )}
        </Droppable>
        <Droppable droppableId="userList">
          {provided => (
            <ul
              className={`userList-${title}`}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              {userList.map((item, i) => (
                <Draggable key={`${item.name}-${i}`} draggableId={`${item.name}-${i}`} index={i}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    >
                      <span>{item.name}</span>
                    </li>
                  )}
                </Draggable>
              ))}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
};

export default DraggableList;
