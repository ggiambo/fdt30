package net.rcfmedia.fdt30.persistence

import net.rcfmedia.fdt30.configuration.Configuration
import org.springframework.cache.annotation.CacheEvict
import org.springframework.data.repository.PagingAndSortingRepository

interface UserRepository : PagingAndSortingRepository<User?, Int?> {
    fun findByName(name: String): User?

    @CacheEvict(value = [Configuration.avatarCache], key = "#user.id")
    override fun <S : User?> save(user: S): S

    companion object {
        const val PAGE_SIZE = 10
    }
}