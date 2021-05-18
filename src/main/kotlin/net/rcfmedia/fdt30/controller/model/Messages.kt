package net.rcfmedia.fdt30.controller.model

import net.rcfmedia.fdt30.peristence.Message

class Messages(
    val messages: List<Message>,
    val actualPage: Int,
    val totalPages: Int
)
