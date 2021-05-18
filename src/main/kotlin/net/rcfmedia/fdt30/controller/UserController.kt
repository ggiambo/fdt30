package net.rcfmedia.fdt30.controller

import net.rcfmedia.fdt30.auth.LoggedUserInfo
import net.rcfmedia.fdt30.controller.model.NewUser
import net.rcfmedia.fdt30.controller.model.UpdateUser
import net.rcfmedia.fdt30.peristence.User
import net.rcfmedia.fdt30.peristence.UserRepository
import net.rcfmedia.fdt30.peristence.UserRepository.Companion.PAGE_SIZE
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.data.domain.PageRequest
import org.springframework.data.domain.Pageable
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
class UserController(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val loggedUserInfo: LoggedUserInfo
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

    @PostMapping("/user")
    fun registerNewUser(@RequestBody newUser: NewUser): ResponseEntity<String> {
        if (userRepository.findByName(newUser.name) != null) {
            return ResponseEntity("user ${newUser.name} already exists", HttpStatus.CONFLICT)
        }
        val user = User(name = newUser.name, password = passwordEncoder.encode(newUser.password))
        userRepository.save(user)

        log.info("User created name:${user.name} id:${user.id}")

        return ResponseEntity(HttpStatus.OK)
    }

    @PatchMapping("/user")
    fun updateUserPassword(@RequestBody updateUser: UpdateUser): ResponseEntity<String> {
        val user = loggedUserInfo.getUserInfo()
        if (user == null) {
            return ResponseEntity("user not found", HttpStatus.NOT_FOUND)
        }
        if (!passwordEncoder.matches(updateUser.oldPassword, user.password)) {
            return ResponseEntity("old password doesn't matches", HttpStatus.FORBIDDEN)
        }

        user.password = passwordEncoder.encode(updateUser.newPassword)
        userRepository.save(user)

        log.info("User password updated name:${user.name} id:${user.id}")

        return ResponseEntity(HttpStatus.OK)
    }
}