package com.pfa.spring_boot.dto;
import java.util.List;

public class ReportsEvolutionDTO {
    private List<String> labels;
    private List<Long> values;

    // Constructors
    public ReportsEvolutionDTO() {
    }

    public ReportsEvolutionDTO(List<String> labels, List<Long> values) {
        this.labels = labels;
        this.values = values;
    }

    // Getters and Setters
    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<Long> getValues() {
        return values;
    }

    public void setValues(List<Long> values) {
        this.values = values;
    }
}

