package net.rcfmedia.fdt30.controller.model

import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class NewMessage(
    @field:NotNull
    @field:Size(min = 1, max = 255)
    val subject: String,

    @field:NotNull
    @field:Size(min = 1, max = 4096)
    val content: String,

    var parentId: Int? = null
)