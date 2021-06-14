package net.rcfmedia.fdt30.peristence

import org.springframework.data.repository.PagingAndSortingRepository

interface UserRepository : PagingAndSortingRepository<User?, Int?> {
    fun findByName(name: String): User?
    fun findByNameAndPassword(name: String, password: String): User?

    companion object {
        const val PAGE_SIZE = 10
    }
}