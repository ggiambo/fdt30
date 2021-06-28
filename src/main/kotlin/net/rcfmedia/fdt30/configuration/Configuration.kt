package net.rcfmedia.fdt30.configuration

import com.github.benmanes.caffeine.cache.Caffeine
import org.springframework.cache.CacheManager
import org.springframework.cache.caffeine.CaffeineCacheManager
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod.*
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
class Configuration {

    @Bean
    fun passwordEncoder() = BCryptPasswordEncoder()

    @Bean
    fun webMvcConfigurer(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry
                    .addMapping("/**")
                    .allowedMethods(OPTIONS.name, HEAD.name, GET.name, POST.name, PATCH.name)
                    .exposedHeaders("authorization")
            }
        }
    }

    @Bean
    fun avatarCacheManager(): CacheManager? {
        return CaffeineCacheManager(avatarCache).apply {
            setCaffeine(Caffeine.newBuilder().maximumSize(50))
        }
    }

    companion object {
        const val avatarCache = "AVATAR_CACHE"
    }
}

