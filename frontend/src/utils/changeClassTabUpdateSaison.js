const changeClassTabUpdateSaison = (
    type,
    formulaOne,
    circuit,
    formulaTwoTeams,
    entitySetup
) => {
    if (circuit) {
        if (type === 'formulaOneTeams') {
            if (
                !formulaOne.classList.contains('tab__active') ||
                formulaOne.classList.contains('tab__no__active')
            ) {
                formulaOne.classList.replace('tab__no__active', 'tab__active');
            }

            if (
                formulaTwoTeams.classList.contains('tab__active') &&
                !formulaTwoTeams.classList.contains('tab__no__active')
            ) {
                formulaTwoTeams.classList.replace(
                    'tab__active',
                    'tab__no__active'
                );
            }

            if (
                entitySetup.classList.contains('tab__active') &&
                !entitySetup.classList.contains('tab__no__active')
            ) {
                entitySetup.classList.replace('tab__active', 'tab__no__active');
            }

            if (
                circuit.classList.contains('tab__active') &&
                !circuit.classList.contains('tab__no__active')
            ) {
                circuit.classList.replace('tab__active', 'tab__no__active');
            }
        } else if (type === 'circuit') {
            if (
                !circuit.classList.contains('tab__active') ||
                circuit.classList.contains('tab__no__active')
            ) {
                circuit.classList.replace('tab__no__active', 'tab__active');
            }

            if (
                formulaTwoTeams.classList.contains('tab__active') &&
                !formulaTwoTeams.classList.contains('tab__no__active')
            ) {
                formulaTwoTeams.classList.replace(
                    'tab__active',
                    'tab__no__active'
                );
            }

            if (
                formulaOne.classList.contains('tab__active') &&
                !formulaOne.classList.contains('tab__no__active')
            ) {
                formulaOne.classList.replace('tab__active', 'tab__no__active');
            }

            if (
                entitySetup.classList.contains('tab__active') &&
                !entitySetup.classList.contains('tab__no__active')
            ) {
                entitySetup.classList.replace('tab__active', 'tab__no__active');
            }
        } else if (type === 'formulaTwoTeams') {
            if (
                !formulaTwoTeams.classList.contains('tab__active') ||
                formulaTwoTeams.classList.contains('tab__no__active')
            ) {
                formulaTwoTeams.classList.replace(
                    'tab__no__active',
                    'tab__active'
                );
            }

            if (
                circuit.classList.contains('tab__active') &&
                !circuit.classList.contains('tab__no__active')
            ) {
                circuit.classList.replace('tab__active', 'tab__no__active');
            }

            if (
                formulaOne.classList.contains('tab__active') &&
                !formulaOne.classList.contains('tab__no__active')
            ) {
                formulaOne.classList.replace('tab__active', 'tab__no__active');
            }

            if (
                entitySetup.classList.contains('tab__active') &&
                !entitySetup.classList.contains('tab__no__active')
            ) {
                entitySetup.classList.replace('tab__active', 'tab__no__active');
            }
        } else if (type === 'entitySetups') {
            if (
                !entitySetup.classList.contains('tab__active') ||
                entitySetup.classList.contains('tab__no__active')
            ) {
                entitySetup.classList.replace('tab__no__active', 'tab__active');
            }

            if (
                circuit.classList.contains('tab__active') &&
                !circuit.classList.contains('tab__no__active')
            ) {
                circuit.classList.replace('tab__active', 'tab__no__active');
            }

            if (
                formulaOne.classList.contains('tab__active') &&
                !formulaOne.classList.contains('tab__no__active')
            ) {
                formulaOne.classList.replace('tab__active', 'tab__no__active');
            }

            if (
                formulaTwoTeams.classList.contains('tab__active') &&
                !formulaTwoTeams.classList.contains('tab__no__active')
            ) {
                formulaTwoTeams.classList.replace(
                    'tab__active',
                    'tab__no__active'
                );
            }
        }
    }
};

export default changeClassTabUpdateSaison;
