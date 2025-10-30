package com.excelr.lyricSync_backend.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MusicService {

    private final String API_KEY = "AIzaSyB-JVsAzBIgp6cgttrwQ2a2S19d5R3do7k";
    private final String YT_API_URL = "https://www.googleapis.com/youtube/v3/search";

    public Map<String, String> searchSong(String query) {
        String url = YT_API_URL + "?part=snippet&type=video&maxResults=1&q=" + query + "&key=" + API_KEY;

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);

        List<Map<String, Object>> items = (List<Map<String, Object>>) response.getBody().get("items");
        Map<String, Object> first = items.get(0);
        String videoId = ((Map<String, String>) first.get("id")).get("videoId");

        Map<String, String> result = new HashMap<>();
        result.put("videoId", videoId);
        return result;
    }
}

