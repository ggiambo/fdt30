package net.rcfmedia.fdt30.controller

import net.rcfmedia.fdt30.auth.LoggedUserInfo
import net.rcfmedia.fdt30.controller.model.NewMessage
import net.rcfmedia.fdt30.peristence.Message
import net.rcfmedia.fdt30.peristence.MessageRepository
import net.rcfmedia.fdt30.peristence.MessageRepository.Companion.PAGE_SIZE
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.web.bind.annotation.*

@RestController
class MessageController(private val messageRepository: MessageRepository, private val loggedUserInfo: LoggedUserInfo) {

    @GetMapping("/messages")
    fun getMessages(): List<Message> {
        return getMessages(0)
    }

    @GetMapping("/messages/{pageNr}")
    fun getMessages(@PathVariable pageNr: Int): List<Message> {
        val sortedByName: Pageable = PageRequest.of(pageNr, PAGE_SIZE, Sort.by(Message::created.name))
        return messageRepository.findAll(sortedByName).content.filterNotNull()
    }

    @PostMapping("/message")
    fun newMessage(@RequestBody newMessage: NewMessage) : Message {
        val message = Message(
            subject = newMessage.subject,
            content = newMessage.content,
            user = loggedUserInfo.getUserInfo()
        )
        return messageRepository.save(message)
    }
}