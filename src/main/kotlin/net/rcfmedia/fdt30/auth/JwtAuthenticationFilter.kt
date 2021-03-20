package net.rcfmedia.fdt30.auth

import io.jsonwebtoken.JwtException
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Value
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Service
class JwtAuthenticationFilter : OncePerRequestFilter() {

    @Value("\${jwt.secret:}")
    lateinit var jwtSecret: ByteArray

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val token = getToken(request)
        if (token != null) {
            val authentication = getAuthentication(token)
            if (authentication != null) {
                SecurityContextHolder.getContext().authentication = authentication
            }
        }

        chain.doFilter(request, response)
    }

    private fun getToken(request: HttpServletRequest): String? {
        val header = request.getHeader("Authorization")
        if (header == null) {
            return null
        }
        if (!header.startsWith("Bearer")) {
            return null
        }

        return header.replace("Bearer", "").trim()
    }

    private fun getAuthentication(token: String): UsernamePasswordAuthenticationToken? {
        try {
            val user = Jwts.parser()
                .setSigningKey(jwtSecret)
                .parseClaimsJws(token)
                .body
                .subject

            if (user != null) {
                return UsernamePasswordAuthenticationToken(user, null, emptyList())
            }
        } catch (e: JwtException) {
            return null
        }

        return null
    }
}