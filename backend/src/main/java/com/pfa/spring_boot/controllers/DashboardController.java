package com.pfa.spring_boot.controllers;

import com.pfa.spring_boot.dto.DashboardStatsDTO;
import com.pfa.spring_boot.dto.ReportsEvolutionDTO;
import com.pfa.spring_boot.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public DashboardStatsDTO getDashboardStats() {
        return dashboardService.getDashboardStats();
    }

    @GetMapping("/reports-evolution")
    public ReportsEvolutionDTO getReportsEvolution(@RequestParam(defaultValue = "month") String period) {
        return dashboardService.getReportsEvolution(period);
    }
}