package net.rcfmedia.fdt30.controller.model

import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

class NewUser(
    @field:NotNull
    @field:Size(min = 2, max = 20)
    val name: String,
    @field:NotNull
    @field:Size(min = 6, max = 20)
    val password: String
)