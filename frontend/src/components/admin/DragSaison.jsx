/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

export default function Drag({ task, index }) {
    return (
        <Draggable key={task._id} draggableId={task._id} index={index}>
            {(provider) => (
                <div
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                    className="list"
                >
                    <span>{index + 1}. </span>
                    {task.image?.length ? (
                        <img
                            src={`http://localhost:3001/${task.image}`}
                            alt={task.name}
                        />
                    ) : (
                        <span>{task.name}</span>
                    )}

                    {task.nation?.length && (
                        <span>
                            {task.nation} - ( {task.name} )
                        </span>
                    )}
                </div>
            )}
        </Draggable>
    );
}
