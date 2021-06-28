package net.rcfmedia.fdt30.auth

import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import java.time.ZonedDateTime
import java.util.*

@Service
class TokenUtils {

    @Value("\${jwt.secret:}")
    lateinit var jwtSecret: String

    // token expires 100 years from "now"
    private val tokenExpirationDate = Date.from(
        ZonedDateTime.now().plusYears(100).toInstant()
    )

    public fun getToken(userName: String) : String {
        return Jwts.builder()
            .setSubject(userName)
            .setExpiration(tokenExpirationDate)
            .signWith(SignatureAlgorithm.HS512, jwtSecret.toByteArray())
            .compact()
    }

}