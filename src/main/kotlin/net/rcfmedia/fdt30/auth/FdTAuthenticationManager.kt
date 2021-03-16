package net.rcfmedia.fdt30.auth

import net.rcfmedia.fdt30.peristence.UserRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.BadCredentialsException
import org.springframework.security.core.Authentication
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service

@Service
class FdTAuthenticationManager(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) : AuthenticationManager {

    override fun authenticate(authentication: Authentication): Authentication {
        val name = authentication.principal as String
        val user = userRepository.findByName(name)
        if (user == null) {
            throw UsernameNotFoundException("No user with name $name")
        }

        val password = authentication.credentials as String
        if (!passwordEncoder.matches(password, user.password)) {
            throw BadCredentialsException("Supplied password doesn't match")
        }

        return authentication
    }
}