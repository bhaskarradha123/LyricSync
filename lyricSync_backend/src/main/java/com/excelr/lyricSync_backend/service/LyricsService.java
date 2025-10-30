package com.excelr.lyricSync_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class LyricsService {

    @Autowired
    private WebClient webClient;


    public Mono<String> getLyrics(String artist, String title) {
        return null;
    }
}
