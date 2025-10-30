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
        try {
            String encodedArtist = URLEncoder.encode(artist, StandardCharsets.UTF_8);
            String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);

            String apiUrl = "https://api.lyrics.ovh/v1/" + encodedArtist + "/" + encodedTitle;

            return webClient.get()
                    .uri(apiUrl)
                    .retrieve()
                    .bodyToMono(String.class)
                    .onErrorResume(ex -> {
                        ex.printStackTrace();
                        return Mono.just("{\"error\":\"Lyrics not found or API error\"}");
                    });

        } catch (Exception e) {
            e.printStackTrace();
            return Mono.just("{\"error\":\"Encoding failed\"}");
        }
    }
}
