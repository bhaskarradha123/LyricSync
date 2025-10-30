package com.excelr.lyricSync_backend.controller;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.excelr.lyricSync_backend.service.MusicService;

@RestController
@RequestMapping("/api/music")
@CrossOrigin(origins = "*") 
public class MusicController {

    @Autowired
    private MusicService musicService;

    @GetMapping("/search")
    public Map<String, String> searchSong(@RequestParam String query) {
        return musicService.searchSong(query);
    }
}

