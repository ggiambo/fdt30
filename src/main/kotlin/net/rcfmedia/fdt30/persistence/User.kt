package net.rcfmedia.fdt30.persistence

import com.fasterxml.jackson.annotation.JsonIgnore
import java.time.LocalDateTime
import javax.persistence.*

@Entity
class User(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    @Column(updatable = false)
    val name: String,

    @Column(updatable = false)
    var created: LocalDateTime? = null,

    @Column
    var updated: LocalDateTime? = null,

    @get:JsonIgnore
    var password: String,

    @Lob
    @get:JsonIgnore
    var avatarBase64: String? = null,
) {
    @PrePersist
    fun prePersist() {
        created = LocalDateTime.now()
    }

    @PreUpdate
    fun preUpdate() {
        updated = LocalDateTime.now()
    }
}