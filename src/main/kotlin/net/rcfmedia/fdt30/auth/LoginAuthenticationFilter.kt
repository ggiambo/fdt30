package net.rcfmedia.fdt30.auth

import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import org.springframework.stereotype.Service
import java.io.IOException
import javax.annotation.PostConstruct
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class LoginAuthenticationFilter(
    authenticationManager: FdTAuthenticationManager,
    private val tokenUtils: TokenUtils
) : UsernamePasswordAuthenticationFilter(authenticationManager) {

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
        val token = tokenUtils.getToken(authentication.principal as String)
        response.addHeader("Authorization", "Bearer $token")

        SecurityContextHolder.getContext().authentication = authentication
    }

    class LoginUser(
        val name: String,
        val password: String
    )

}

