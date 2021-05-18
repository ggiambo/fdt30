package net.rcfmedia.fdt30.peristence

import org.springframework.data.repository.PagingAndSortingRepository

interface MessageRepository : PagingAndSortingRepository<Message?, Int?> {
    companion object {
        const val PAGE_SIZE = 3
    }
}