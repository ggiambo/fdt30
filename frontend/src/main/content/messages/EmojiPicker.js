import Picker from "emoji-picker-react"
import React, {Fragment, useState} from "react"
import {Collapse, OverlayTrigger, Tooltip} from "react-bootstrap"
import {CaretDownFill, CaretRightFill, EmojiSmile} from 'react-bootstrap-icons'
import style from "./EmojiPicker.module.scss"

const EmojiPicker = ({handleEmojiClick}) => {

    const [isPickerVisible, setIsPickerVisible] = useState(false)

    return (
        <Fragment>
            <OverlayTrigger placement={"top"} overlay={<Tooltip id="tooltip-disabled">Emoji</Tooltip>}>
                <div className={style.iconsContainer + " mb-2"} onClick={() => setIsPickerVisible(!isPickerVisible)}>
                    {!isPickerVisible && <CaretRightFill color={"gray"}/>}
                    {isPickerVisible && <CaretDownFill color={"gray"}/>}
                    <EmojiSmile color={"gray"}/>
                </div>
            </OverlayTrigger>
            <Collapse in={isPickerVisible}>
                <div>
                    <Picker
                        groupNames={groupNames}
                        groupVisibility={groupVisibility}
                        pickerStyle={{width: '100%'}}
                        native={true}
                        onEmojiClick={(e, emoji) => handleEmojiClick(emoji.emoji)}
                    />
                </div>
            </Collapse>
        </Fragment>
    )
}

const groupNames = {
    smileys_people: 'Faccine e Persone',
    animals_nature: 'Animali e Natura',
    food_drink: 'Cibo e Bevande',
    travel_places: 'Viaggi e Luoghi',
    activities: 'Attività',
    objects: 'Oggetti',
    symbols: 'Simboli',
    flags: 'Bandiere',
    // recently_used: 'Recenti',
}

const groupVisibility = {
    recently_used: false,
}

export default EmojiPicker