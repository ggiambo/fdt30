package net.rcfmedia.fdt30

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cache.annotation.EnableCaching

@EnableCaching
@SpringBootApplication
class Fdt30Application

fun main(args: Array<String>) {
    runApplication<Fdt30Application>(*args)
}
