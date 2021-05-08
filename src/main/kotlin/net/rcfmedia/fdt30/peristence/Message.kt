package net.rcfmedia.fdt30.peristence

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Message(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    var parentId: Int? = null,

    @Column(updatable = false, insertable = true)
    var created: LocalDateTime? = null,

    @OneToOne @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: User? = null,

    var subject: String,

    @Lob
    var content: String,
) {
    @PrePersist
    fun prePersist() {
        created = LocalDateTime.now()
    }
}