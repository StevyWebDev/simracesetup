const dropSaison = (data = null, dataSaison = null, form = false) => {
    const newArrayData = {};
    const newArrayDataId = [];
    const newArraySaisonData = {};
    const newArraySaisonDataId = [];

    if (data) {
        data.forEach((value) => {
            const dataId = value._id;
            newArrayData[dataId] = value;
            newArrayDataId.push(dataId);
        });
    }

    if (dataSaison) {
        dataSaison.forEach((value) => {
            const dataId = value._id;
            newArraySaisonData[dataId] = value;
            newArraySaisonDataId.push(dataId);
            newArrayDataId.splice(newArrayDataId.indexOf(dataId, 0), 1);
        });
    }

    return {
        tasks: newArrayData,
        colums: {
            listTasks: {
                id: 'listTasks',
                tasksIds: newArrayDataId,
            },
            listTasksSaison: {
                id: 'listTasksSaison',
                tasksIds: newArraySaisonDataId,
            },
        },
        form,
        columnOrder: ['listTasks', 'listTasksSaison'],
    };
};

export default dropSaison;
