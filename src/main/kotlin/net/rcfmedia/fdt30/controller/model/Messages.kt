package net.rcfmedia.fdt30.controller.model

import net.rcfmedia.fdt30.persistence.Message

class Messages(
    val messages: List<Message>,
    val totalPages: Int
)
