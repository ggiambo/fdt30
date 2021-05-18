package net.rcfmedia.fdt30.controller

import net.rcfmedia.fdt30.auth.LoggedUserInfo
import net.rcfmedia.fdt30.controller.model.Messages
import net.rcfmedia.fdt30.controller.model.NewMessage
import net.rcfmedia.fdt30.peristence.Message
import net.rcfmedia.fdt30.peristence.MessageRepository
import net.rcfmedia.fdt30.peristence.MessageRepository.Companion.PAGE_SIZE
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

@Validated
@RestController
class MessageController(private val messageRepository: MessageRepository, private val loggedUserInfo: LoggedUserInfo) {

    @GetMapping("/messages")
    fun getMessages(): ResponseEntity<Messages> {
        return getMessages(1)
    }

    @GetMapping("/messages/{pageNr}")
    fun getMessages(@PathVariable pageNr: Int): ResponseEntity<Messages> {
        val sortedByCreationDate: Pageable = PageRequest.of(pageNr, PAGE_SIZE, Sort.by(Message::created.name).descending())
        val messages = messageRepository.findAll(sortedByCreationDate)

        return ResponseEntity.ok(
            Messages(
                messages = messages.content.filterNotNull(),
                actualPage = pageNr - 1,
                totalPages = messages.totalPages
            )
        )
    }

    @PostMapping("/message")
    fun newMessage(@Valid @RequestBody newMessage: NewMessage): ResponseEntity<Message> {
        val message = Message(
            subject = newMessage.subject,
            content = newMessage.content,
            user = loggedUserInfo.getUserInfo()
        )
        return ResponseEntity.ok(messageRepository.save(message))
    }
}