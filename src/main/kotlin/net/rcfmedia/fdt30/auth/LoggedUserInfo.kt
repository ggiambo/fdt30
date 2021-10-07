package net.rcfmedia.fdt30.auth

import net.rcfmedia.fdt30.persistence.User
import net.rcfmedia.fdt30.persistence.UserRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service

@Service
class LoggedUserInfo(private val userRepository: UserRepository) {

    fun getUserInfo(): User? {
        val authentication = SecurityContextHolder.getContext().authentication
        if (authentication == null) {
            return null
        }

        return userRepository.findByName(authentication.name)
    }
}