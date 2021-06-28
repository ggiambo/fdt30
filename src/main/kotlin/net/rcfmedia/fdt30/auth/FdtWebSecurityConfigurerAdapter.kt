package net.rcfmedia.fdt30.auth

import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.stereotype.Service

@Service
class FdtWebSecurityConfigurerAdapter(
    private val loginAuthenticationFilter: LoginAuthenticationFilter,
    private val jwtAuthenticationFilter: JwtAuthenticationFilter,
) :
    WebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        http
            .httpBasic()
            .and()
            .authorizeRequests()
            .antMatchers(HttpMethod.GET, "/messages", "/messages/*", "/messages/*/user/*").permitAll()
            .antMatchers(HttpMethod.POST, "/message").fullyAuthenticated()
            .antMatchers(HttpMethod.GET, "/users", "/users/*", "avatar/*").permitAll()
            .antMatchers(HttpMethod.POST, "/user").permitAll()
            .antMatchers(HttpMethod.PATCH, "/user").fullyAuthenticated()
            .and()
            .addFilter(loginAuthenticationFilter)
            .addFilterBefore(jwtAuthenticationFilter, loginAuthenticationFilter::class.java)
            .cors()
            .and()
            .csrf().disable()
            .formLogin().disable()
    }

}