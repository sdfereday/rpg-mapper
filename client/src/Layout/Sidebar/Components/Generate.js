import React, { defaultProps } from 'react';
import Radio from '../../../Common/Radio';
import Button from '../../../Common/Button';
import LabeledComponent from '../../../Common/LabeledComponent';
import { GENERATOR_TYPES } from '../../../Consts/EditorConstants.js';

const Generate = ({
    currentMode,
    invalidValues,
    onChangeCurrentMode,
    onGenerate
}) => {
    return [
        <LabeledComponent text="Generation Mode:" key="use-rot">
                <Radio
                id={GENERATOR_TYPES.BLANK}
                name="Blank Mode"
                checked={currentMode === GENERATOR_TYPES.BLANK}
                onChange={onChangeCurrentMode}
            />
            <Radio
                id={GENERATOR_TYPES.BOX}
                name="Box Mode"
                checked={currentMode === GENERATOR_TYPES.BOX}
                onChange={onChangeCurrentMode}
            />
            <Radio
                id={GENERATOR_TYPES.MAZE}
                name="Maze Mode"
                checked={currentMode === GENERATOR_TYPES.MAZE}
                onChange={onChangeCurrentMode}
            />
            <Radio
                id={GENERATOR_TYPES.CELLULAR}
                name="Cellular Mode"
                checked={currentMode === GENERATOR_TYPES.CELLULAR}
                onChange={onChangeCurrentMode}
            />
            <Radio
                id={GENERATOR_TYPES.ROOM}
                name="Room Mode"
                checked={currentMode === GENERATOR_TYPES.ROOM}
                onChange={onChangeCurrentMode}
            />
        </LabeledComponent>,
        <Button onClick={onGenerate} isDisabled={invalidValues} text="Generate" key="make" />
    ]
}

export default Generate;