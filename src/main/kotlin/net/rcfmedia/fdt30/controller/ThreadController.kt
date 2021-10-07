package net.rcfmedia.fdt30.controller

import net.rcfmedia.fdt30.controller.model.Messages
import net.rcfmedia.fdt30.persistence.Message
import net.rcfmedia.fdt30.persistence.MessageRepository
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class ThreadController(private val messageRepository: MessageRepository) {

    @GetMapping("/threads")
    fun getMessages(): ResponseEntity<Messages> {
        return getThreads(1)
    }

    @GetMapping("/threads/{pageNr}")
    fun getThreads(@PathVariable pageNr: Int): ResponseEntity<Messages> {
        val sortedByCreationDate: Pageable =
            PageRequest.of(pageNr, MessageRepository.PAGE_SIZE, Sort.by(Message::created.name).descending())
        val messages = messageRepository.findThreads(sortedByCreationDate)

        return ResponseEntity.ok(
            Messages(
                messages = messages.content.filterNotNull(),
                totalPages = messages.totalPages
            )
        )
    }

    @GetMapping("/thread/{threadId}")
    fun getThread(@PathVariable threadId: Int): ResponseEntity<Messages> {
        val messages = messageRepository.findAllByThreadIdOrderByCreatedAsc(threadId)

        return ResponseEntity.ok(
            Messages(
                messages = messages,
                totalPages = 1
            )
        )
    }

}