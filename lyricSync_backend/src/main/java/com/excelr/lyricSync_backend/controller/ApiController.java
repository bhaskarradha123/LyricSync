package com.excelr.lyricSync_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.lyricSync_backend.service.LyricsService;
import com.excelr.lyricSync_backend.service.SpotifyService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")
public class ApiController {
    @Autowired
    SpotifyService spotifyService;
    @Autowired
    LyricsService lyricsService;

    @GetMapping("/token")
    public Mono<ResponseEntity<String>> token() {
        return spotifyService.getAppToken().map(t -> ResponseEntity.ok(t));
    }

    @GetMapping("/search")
    public Mono<ResponseEntity<String>> search(@RequestParam String q) {
        return spotifyService.search(q).map(json -> ResponseEntity.ok(json));
    }

    @GetMapping("/lyrics")
    public Mono<ResponseEntity<String>> lyrics(@RequestParam String artist, @RequestParam String title) {
        return lyricsService.getLyrics(artist, title)
                .map(json -> ResponseEntity.ok(json))
                .onErrorReturn(ResponseEntity.status(404).body("{\"error\":\"not found\"}"));
    }

    // Example endpoint to accept manual sync timestamps (store in DB or file)
    @PostMapping("/sync")
    public ResponseEntity<String> saveSync(@RequestBody String syncJson) {
        // TODO persist sync data associated with track id / user
        return ResponseEntity.ok("{\"status\":\"saved\"}");
    }
}
