package com.bestem.TerraTournament.service;

import com.bestem.TerraTournament.repository.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class TerraService {

    private final RoomRepository roomRepository;

    public TerraService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
}
