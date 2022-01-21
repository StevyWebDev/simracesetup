/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Droppable } from 'react-beautiful-dnd';
import Drag from './DragSaison';

export default function Drop({ column, tasks, form }) {
    return (
        <Droppable key={column.id} droppableId={column.id}>
            {(provider) => (
                <div
                    {...provider.droppableProps}
                    ref={provider.innerRef}
                    className="column"
                >
                    {provider.placeholder}

                    {tasks.map((task, index) => (
                        <Drag
                            key={index}
                            task={task}
                            index={index}
                            form={form}
                        />
                    ))}
                </div>
            )}
        </Droppable>
    );
}
