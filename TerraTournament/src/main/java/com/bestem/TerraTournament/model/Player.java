package com.bestem.TerraTournament.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table( name = "player")
@ToString
public class Player {

    @Id
    @Column(name = "player_id")
    @JsonProperty("player_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username")
    @JsonProperty("username")
    private String username;

    @Column(name = "score")
    @JsonProperty("score")
    private Integer score;

    @Column(name = "latitude")
    @JsonProperty("latitude")
    private BigDecimal latitude;

    @Column(name = "longitude")
    @JsonProperty("longitude")
    private BigDecimal longitude;

    @Column(name = "completed_round")
    @JsonProperty("completed_round")
    private Boolean completedRound;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
}
