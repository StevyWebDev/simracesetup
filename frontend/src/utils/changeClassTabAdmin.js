const changeClassTabAdmin = (
    saison,
    formulaOne,
    formulaTwo,
    circuit,
    entitySetup,
    type
) => {
    saison.classList.remove('tab__active');
    formulaOne.classList.remove('tab__active');
    formulaTwo.classList.remove('tab__active');
    circuit.classList.remove('tab__active');
    entitySetup.classList.remove('tab__active');

    saison.classList.add('tab__no__active');
    formulaOne.classList.add('tab__no__active');
    formulaTwo.classList.add('tab__no__active');
    circuit.classList.add('tab__no__active');
    entitySetup.classList.add('tab__no__active');

    document.querySelector(type).classList.remove('tab__no__active');
    document.querySelector(type).classList.add('tab__active');
};

export default changeClassTabAdmin;
