package net.rcfmedia.fdt30.controller.model

import org.springframework.stereotype.Component
import org.springframework.validation.Errors
import org.springframework.validation.Validator

@Component
class NewMessageValidator : Validator {

    val MAX_LENGTH_SUBJECT = 255
    val MAX_LENGTH_CONTENT = 4096

    override fun supports(clazz: Class<*>): Boolean {
        return clazz == NewMessage::class.java
    }

    override fun validate(target: Any, errors: Errors) {
        val newMessage = target as NewMessage
        validateSubject(newMessage, errors)
        validateContent(newMessage, errors)
    }

    private fun validateSubject(newMessage: NewMessage, errors: Errors) {
        if (newMessage.subject.isEmpty()) {
            errors.reject("subject", "SUBJECT_IS_EMPTY")
        }
        if (newMessage.subject.length > MAX_LENGTH_SUBJECT) {
            errors.reject("subject", "SUBJECT_TOO_LONG")
        }

    }

    private fun validateContent(newMessage: NewMessage, errors: Errors) {
        if (newMessage.content.isEmpty()) {
            errors.reject("content", "CONTENT_IS_EMPTY")
        }
        if (newMessage.content.length > MAX_LENGTH_CONTENT) {
            errors.reject("content", "CONTENT_TOO_LONG")
        }

    }
}