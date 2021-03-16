package net.rcfmedia.fdt30.peristence

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonSetter
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) var id: Int? = null,
    @Column(updatable = false) val name: String,
    @Column(updatable = false, insertable = false) val created: LocalDateTime? = null,
    @get:JsonIgnore var password: String
)