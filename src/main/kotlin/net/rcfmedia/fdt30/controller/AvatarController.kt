package net.rcfmedia.fdt30.controller

import net.rcfmedia.fdt30.configuration.Configuration
import net.rcfmedia.fdt30.peristence.UserRepository
import org.springframework.cache.annotation.Cacheable
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
class AvatarController(
    private val userRepository: UserRepository,
) {

    val decoder = Base64.getDecoder()

    @Cacheable(value = [Configuration.avatarCache], key="#userId")
    @GetMapping("/avatar/{userId}")
    fun getAvatar(@PathVariable userId: Int): ResponseEntity<ByteArray> {
        val avatarBase64 = userRepository.findByIdOrNull(userId)?.avatarBase64
        if (avatarBase64.isNullOrEmpty()) {
            return ResponseEntity.notFound().build()
        }
        return ResponseEntity.ok(decoder.decode(avatarBase64))
    }

}