import React, { defaultProps } from 'react';
import Radio from '../../../Common/Radio';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';
import LabeledComponent from '../../../Common/LabeledComponent';
import { ROT_TYPES } from '../../../Consts/EditorConstants.js';

const ROTComponent = ({
    swapSpace,
    currentMode,
    onChangeCurrentMode,
    onSwapSpace,
    onGenerate
}) => {
    return [
        <LabeledComponent text="Generation Mode:" key="use-rot">
            <Radio
                id={ROT_TYPES.MAZE}
                name="Maze Mode"
                checked={currentMode === ROT_TYPES.MAZE}
                onChange={onChangeCurrentMode}
            />
            <Radio
                id={ROT_TYPES.ROOM}
                name="Room Mode"
                checked={currentMode === ROT_TYPES.ROOM}
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
        <Button onClick={onGenerate} text="Generate" key="make" />
    ]
}

export default ROTComponent;