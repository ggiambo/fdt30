package net.rcfmedia.fdt30.controller.model

import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class NewMessage(
    @NotNull
    @Size(min=1, max=255)
    val subject: String,

    @NotNull
    @Size(min=1, max=4096)
    val content: String
)