package com.pfa.spring_boot.service;

import com.pfa.spring_boot.dto.DashboardStatsDTO;
import com.pfa.spring_boot.dto.ReportsEvolutionDTO;
import com.pfa.spring_boot.enums.stage.StatutRapport;
import com.pfa.spring_boot.repositories.EnseignantRepository;
import com.pfa.spring_boot.repositories.EtudiantRepository;
import com.pfa.spring_boot.repositories.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private EnseignantRepository enseignantRepository;

    public DashboardStatsDTO getDashboardStats() {
        long totalReports = stageRepository.count();
        long validatedReports = stageRepository.countByStatutRapport(StatutRapport.VALIDE);
        long pendingReports = stageRepository.countByStatutRapport(StatutRapport.EN_ATTENTE);
        long rejectedReports = stageRepository.countByStatutRapport(StatutRapport.REFUSE);
        long activeStudents = etudiantRepository.count();
        long activeTeachers = enseignantRepository.count();

        return new DashboardStatsDTO(
                totalReports,
                validatedReports,
                pendingReports,
                rejectedReports,
                activeStudents,
                activeTeachers
        );
    }

    public ReportsEvolutionDTO getReportsEvolution(String period) {
        LocalDate now = LocalDate.now();
        List<String> labels = new ArrayList<>();
        List<Long> values = new ArrayList<>();

        switch (period.toLowerCase()) {
            case "week":
                DateTimeFormatter dayFormatter = DateTimeFormatter.ofPattern("EEE");
                for (int i = 6; i >= 0; i--) {
                    LocalDate date = now.minusDays(i);
                    labels.add(date.format(dayFormatter));
                    values.add(stageRepository.countByDateDepot(date));
                }
                break;
            case "month":
                for (int i = 29; i >= 0; i--) {
                    LocalDate date = now.minusDays(i);
                    labels.add(String.valueOf(date.getDayOfMonth()));
                    values.add(stageRepository.countByDateDepot(date));
                }
                break;
            case "year":
                DateTimeFormatter monthFormatter = DateTimeFormatter.ofPattern("MMM");
                for (int i = 11; i >= 0; i--) {
                    LocalDate date = now.minusMonths(i);
                    labels.add(date.format(monthFormatter));
                    values.add(stageRepository.countByMonthAndYear(
                            date.getMonthValue(), date.getYear()));
                }
                break;
            default:
                for (int i = 29; i >= 0; i--) {
                    LocalDate date = now.minusDays(i);
                    labels.add(String.valueOf(date.getDayOfMonth()));
                    values.add(stageRepository.countByDateDepot(date));
                }
        }

        return new ReportsEvolutionDTO(labels, values);
    }
}
