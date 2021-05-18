package net.rcfmedia.fdt30.auth

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.stereotype.Service
import org.springframework.web.cors.CorsConfiguration
import java.io.IOException
import java.time.ZonedDateTime
import java.util.*
import javax.annotation.PostConstruct
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class LoginAuthenticationFilter(
    authenticationManager: FdTAuthenticationManager,
) :
    UsernamePasswordAuthenticationFilter(authenticationManager) {

    // token expires 100 years from "now"
    private val tokenExpirationDate = Date.from(
        ZonedDateTime.now().plusYears(100).toInstant()
    )

    @Value("\${jwt.secret:}")
    lateinit var jwtSecret: String

    @PostConstruct
    fun postConstruct() {
        setFilterProcessesUrl("/login")
    }

    override fun attemptAuthentication(request: HttpServletRequest, response: HttpServletResponse): Authentication {
        try {
            val credentials = jacksonObjectMapper().readValue(request.inputStream, LoginUser::class.java)
            return authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken(credentials.name, credentials.password, emptyList())
            )
        } catch (e: IOException) {
            throw RuntimeException("Could not read request", e)
        }
    }

    override fun successfulAuthentication(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain,
        authentication: Authentication
    ) {
        val token = Jwts.builder()
            .setSubject((authentication.principal as String))
            .setExpiration(tokenExpirationDate)
            .signWith(SignatureAlgorithm.HS512, jwtSecret.toByteArray())
            .compact()
        response.addHeader("Authorization", "Bearer $token")

        SecurityContextHolder.getContext().authentication = authentication
    }

    class LoginUser(
        val name: String,
        val password: String
    )
}

