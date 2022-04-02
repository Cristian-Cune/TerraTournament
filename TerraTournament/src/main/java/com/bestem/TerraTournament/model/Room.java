package com.bestem.TerraTournament.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table( name = "room")
@ToString
public class Room {

    @Id
    @Column(name = "room_id")
    @JsonProperty("room_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_code")
    private String roomCode;

    @Column(name = "duration_in_seconds")
    private Integer durationInSeconds;

    @OneToMany(mappedBy = "room",cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonProperty("players")
    private List<Player> players = new ArrayList<>();

    @Column(name = "current_player")
    @JsonProperty("current_player")
    private String currentPlayerUsername;

    @Column(name = "number_of_rounds")
    @JsonProperty("number_of_rounds")
    private String numberOfRounds;

    @Column(name = "current_round")
    @JsonProperty("current_round")
    private String currentRound;

    @Column(name = "leader_username")
    @JsonProperty("leader_username")
    private String leaderUsername;
}
