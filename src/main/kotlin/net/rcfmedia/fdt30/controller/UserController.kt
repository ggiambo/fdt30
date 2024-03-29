package net.rcfmedia.fdt30.controller

import net.rcfmedia.fdt30.auth.LoggedUserInfo
import net.rcfmedia.fdt30.auth.TokenUtils
import net.rcfmedia.fdt30.controller.model.NewUser
import net.rcfmedia.fdt30.controller.model.UpdateUser
import net.rcfmedia.fdt30.persistence.User
import net.rcfmedia.fdt30.persistence.UserRepository
import net.rcfmedia.fdt30.persistence.UserRepository.Companion.PAGE_SIZE
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.data.repository.findByIdOrNull
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
class UserController(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val loggedUserInfo: LoggedUserInfo,
    private val tokenUtils: TokenUtils
) {

    var log: Logger = LoggerFactory.getLogger(UserController::class.java)

    @GetMapping("/users")
    fun getUsers(): List<User> {
        return getUsers(0)
    }

    @GetMapping("/users/{pageNr}")
    fun getUsers(@PathVariable pageNr: Int): List<User> {
        val sortedByName: Pageable = PageRequest.of(pageNr, PAGE_SIZE, Sort.by(User::name.name))
        return userRepository.findAll(sortedByName).content.filterNotNull()
    }

    @GetMapping("/user")
    fun getLoggedUserInfo(): User? {
        return loggedUserInfo.getUserInfo()
    }

    @GetMapping("/user/{userId}")
    fun getUserInfo(@PathVariable userId: Int): User? {
        return userRepository.findByIdOrNull(userId)
    }

    @PostMapping("/user")
    fun registerNewUser(@RequestBody newUser: NewUser): ResponseEntity<String> {
        if (userRepository.findByName(newUser.name) != null) {
            return ResponseEntity("user ${newUser.name} already exists", HttpStatus.CONFLICT)
        }
        val user = User(
            name = newUser.name,
            password = passwordEncoder.encode(newUser.password),
            avatarBase64 = newUser.avatarBase64
        )
        userRepository.save(user)

        log.info("User created name:${user.name} id:${user.id}")

        val token = tokenUtils.getToken(user.name)
        val headers = HttpHeaders().apply {
            add("Authorization", "Bearer $token")
        }
        return ResponseEntity(headers, HttpStatus.OK)
    }

    @PatchMapping("/user")
    fun updateUser(@RequestBody updateUser: UpdateUser): ResponseEntity<String> {
        val user = loggedUserInfo.getUserInfo()
        if (user == null) {
            return ResponseEntity("user not found", HttpStatus.NOT_FOUND)
        }

        if (isUpdatePassword(updateUser)) {
            if (!passwordEncoder.matches(updateUser.oldPassword, user.password)) {
                return ResponseEntity("old password doesn't matches", HttpStatus.FORBIDDEN)
            }
            user.password = passwordEncoder.encode(updateUser.newPassword)
        }

        if (isUpdateAvatar(updateUser)) {
            user.avatarBase64 = updateUser.avatarBase64
        }

        userRepository.save(user)

        log.info("User password updated name:${user.name} id:${user.id}")

        return ResponseEntity(HttpStatus.OK)
    }

    private fun isUpdatePassword(updateUser: UpdateUser): Boolean {
        if (updateUser.newPassword.isNullOrEmpty() && updateUser.oldPassword.isNullOrEmpty()) {
            return false
        }
        return true
    }

    private fun isUpdateAvatar(updateUser: UpdateUser): Boolean {
        return !updateUser.avatarBase64.isNullOrEmpty()
    }
}