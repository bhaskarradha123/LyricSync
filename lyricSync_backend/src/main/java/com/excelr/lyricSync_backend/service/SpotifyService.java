package com.excelr.lyricSync_backend.service;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class SpotifyService {

	private final WebClient webClient = WebClient.builder().baseUrl("https://api.spotify.com/v1").build();
	@Value("${spotify.client-id}")
	private String clientId;
	@Value("${spotify.client-secret}")
	private String clientSecret;

	// Get client credential token
	public Mono<String> getAppToken() {
		String auth = clientId + ":" + clientSecret;
		String encoded = Base64.getEncoder().encodeToString(auth.getBytes());

		return webClient.post().uri("https://accounts.spotify.com/api/token")
				.header(HttpHeaders.AUTHORIZATION, "Basic " + encoded)
				.contentType(MediaType.APPLICATION_FORM_URLENCODED).bodyValue("grant_type=client_credentials")
				.retrieve().bodyToMono(String.class).map(body -> {
					// simple parse for access_token (use Jackson in full impl)
					int idx = body.indexOf("\"access_token\":\"");
					if (idx < 0)
						return null;
					int start = idx + 16;
					int end = body.indexOf("\"", start);
					return body.substring(start, end);
				});
	}

	public Mono<String> search(String q) {
		return getAppToken().flatMap(
				token -> webClient.get().uri("https://api.spotify.com/v1/search?q=" + q + "&type=track,artist&limit=10")
						.header(HttpHeaders.AUTHORIZATION, "Bearer " + token).retrieve().bodyToMono(String.class));
	}

}
