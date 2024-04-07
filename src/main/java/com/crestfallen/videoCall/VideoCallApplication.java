package com.crestfallen.videoCall;

import com.crestfallen.videoCall.user.User;
import com.crestfallen.videoCall.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VideoCallApplication {

    public static void main(String[] args) {
        SpringApplication.run(VideoCallApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(
            UserService userService
    ) {
        return args -> {
            userService.register(User.builder()
                    .username("user1")
                    .email("user1@mail.com")
                    .password("pass")
                    .build());
            userService.register(User.builder()
                    .username("user2")
                    .email("user2@mail.com")
                    .password("pass")
                    .build());
            userService.register(User.builder()
                    .username("user3")
                    .email("user3@mail.com")
                    .password("pass")
                    .build());
        };
    }
}
