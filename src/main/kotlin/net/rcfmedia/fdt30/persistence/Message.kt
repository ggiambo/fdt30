package net.rcfmedia.fdt30.persistence

import java.time.LocalDateTime
import javax.persistence.*

@Entity
class Message(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int? = null,

    var parentId: Int? = null,

    var threadId: Int? = null,

    @Column(updatable = false)
    var created: LocalDateTime? = null,

    @Column
    var updated: LocalDateTime? = null,

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    var user: User,

    var subject: String,

    @Lob
    var content: String
) {
    @PrePersist
    fun prePersist() {
        created = LocalDateTime.now()
    }

    /**
     * If [threadId] is present, do nothing, else set it as this id (Root of thread)
     */
    @PostPersist
    fun postPersist() {
        threadId = threadId ?: id
    }

    @PreUpdate
    fun preUpdate() {
        updated = LocalDateTime.now()
    }
}