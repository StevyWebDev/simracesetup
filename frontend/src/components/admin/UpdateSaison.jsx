/* eslint-disable react/prop-types */
import React from 'react';
import Drop from './DropSaison';

export default function UpdateSaison({ drop }) {
    return (
        <div className="block__column">
            {drop &&
                drop.columnOrder.map((columnId) => {
                    const column = drop.colums[columnId];
                    const tasks = column.tasksIds.map(
                        (tasksIds) => drop.tasks[tasksIds]
                    );
                    return (
                        <Drop key={column.id} column={column} tasks={tasks} />
                    );
                })}
        </div>
    );
}
