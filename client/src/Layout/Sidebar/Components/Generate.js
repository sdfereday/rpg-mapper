import React, { defaultProps } from 'react';
import Radio from '../../../Common/Radio';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';
import LabeledComponent from '../../../Common/LabeledComponent';
import { GENERATOR_TYPES } from '../../../Consts/EditorConstants.js';

const Generate = ({
    swapSpace,
    currentMode,
    invalidValues,
    onChangeCurrentMode,
    onSwapSpace,
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
                id={GENERATOR_TYPES.MAZE}
                name="Maze Mode"
                checked={currentMode === GENERATOR_TYPES.MAZE}
                onChange={onChangeCurrentMode}
            />
            <Radio
                id={GENERATOR_TYPES.ROOM}
                name="Room Mode"
                checked={currentMode === GENERATOR_TYPES.ROOM}
                onChange={onChangeCurrentMode}
            />
        </LabeledComponent>,
        <LabeledComponent text="Placement Invert:" key="rot-mode">
            <Checkbox
                id="swapSpace"
                label="Swap space for blocks"
                checked={swapSpace}
                onChange={onSwapSpace}
            />
        </LabeledComponent>,
        <Button onClick={onGenerate} isDisabled={invalidValues} text="Generate" key="make" />
    ]
}

export default Generate;