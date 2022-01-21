/* eslint-disable react/prop-types */
import React from 'react';

export default function BlockTasksList({ value, title }) {
    return (
        <div className="block__tasksList">
            {value?.length > 0 && (
                <div className="block__tasks">
                    <h4>{title}</h4>
                    {value.map((task, index) => (
                        <figure key={task._id}>
                            <img
                                src={`http://localhost:3001/${task.image}`}
                                alt={`${task.name}`}
                                width="100%"
                            />
                            <figcaption>
                                <span>{index + 1}</span>
                                <span>{task.name}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            )}
        </div>
    );
}
