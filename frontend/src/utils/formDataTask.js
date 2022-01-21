/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

export default (task, data, file = null) => {
    for (const key in task) {
        data.append(key, task[key]);
    }
    if (file) data.append('image', file);

    return data;
};
