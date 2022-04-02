package com.bestem.TerraTournament.controller;

import com.bestem.TerraTournament.service.TerraService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class TerraController {
    private final TerraService terraService;

    public TerraController(TerraService terraService) {
        this.terraService = terraService;
    }
}
