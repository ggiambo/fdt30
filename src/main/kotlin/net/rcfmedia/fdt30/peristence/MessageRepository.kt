package net.rcfmedia.fdt30.peristence

import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.PagingAndSortingRepository

interface MessageRepository : PagingAndSortingRepository<Message?, Int?> {

    @Query("select m from Message m where m.id = m.threadId")
    fun findThreads(pageable: Pageable): Page<Message?>

    fun findAllByThreadIdOrderByCreatedAsc(threadId: Int) : List<Message>

    fun findAllByUserId(userId: Int): List<Message>

    companion object {
        const val PAGE_SIZE = 10
    }
}