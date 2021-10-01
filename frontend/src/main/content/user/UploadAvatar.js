import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {delError, setError} from "../../../app/alertsSlice"
import {useDispatch} from "react-redux"
import styles from './UploadAvatar.module.scss'
import {Container, Image, Row} from "react-bootstrap"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const UploadAvatar = ({avatar, setAvatar}) => {

    const dispatch = useDispatch()
    const [styleActive, setStyleActive] = useState("")

    const onDrop = useCallback(acceptedFiles => {
        setStyleActive("")
        dispatch(delError())
        acceptedFiles.forEach(file => handleDrop(file, setAvatar, dispatch))
    }, [dispatch])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: onDrop,
        accept: 'image/*',
    })

    return (
        <div {...getRootProps()} className={`${styles.dropArea} ${styleActive}`}
             onDragEnter={() => setStyleActive(styles.styleActive)}
             onDragExit={() => setStyleActive("")}
        >
            <input {...getInputProps()}/>
            Drag&Drop il tuo Avatar qui. Grandezza massima: 100K
            {showAvatar(avatar, setAvatar)}
        </div>
    )
}

const showAvatar = (avatar, setAvatar) => {
    if (avatar != null) {
        return (
            <Container>
                <Row className={"mt-2"}>
                    <Image rounded
                           src={"data:image/png;base64, " + avatar}
                           className={styles.avatarImage}
                           alt={"Avatar"}
                    />
                    <HighlightOffIcon
                        onClick={(e) => {
                            e.stopPropagation()
                            setAvatar(null)
                        }}
                    />
                </Row>
            </Container>
        )
    }
    return null
}

const handleDrop = (file, setAvatar, dispatch) => {
    file.arrayBuffer().then(buffer => {
        if (buffer.byteLength > 102400) {
            dispatch(setError(`Immagine troppo grande: ${Math.ceil(buffer.byteLength / 1024)}K.`))
            setAvatar(null)
            return
        }
        const asArray = new Uint8Array(buffer)
        const asStringChar = String.fromCharCode.apply(null, asArray)
        const base64 = btoa(asStringChar)
        setAvatar(base64)
    })
}

export default UploadAvatar