package com.pfa.spring_boot.dto;

public class DashboardStatsDTO {
    private long totalReports;
    private long validatedReports;
    private long pendingReports;
    private long rejectedReports;
    private long activeStudents;
    private long activeTeachers;

    // Constructors
    public DashboardStatsDTO() {
    }

    public DashboardStatsDTO(long totalReports, long validatedReports, long pendingReports,
                             long rejectedReports, long activeStudents, long activeTeachers) {
        this.totalReports = totalReports;
        this.validatedReports = validatedReports;
        this.pendingReports = pendingReports;
        this.rejectedReports = rejectedReports;
        this.activeStudents = activeStudents;
        this.activeTeachers = activeTeachers;
    }

    // Getters and Setters

    public long getActiveStudents() {
        return activeStudents;
    }

    public long getActiveTeachers() {
        return activeTeachers;
    }

    public long getPendingReports() {
        return pendingReports;
    }

    public long getRejectedReports() {
        return rejectedReports;
    }

    public long getTotalReports() {
        return totalReports;
    }

    public long getValidatedReports() {
        return validatedReports;
    }

    public void setActiveStudents(long activeStudents) {
        this.activeStudents = activeStudents;
    }

    public void setActiveTeachers(long activeTeachers) {
        this.activeTeachers = activeTeachers;
    }

    public void setPendingReports(long pendingReports) {
        this.pendingReports = pendingReports;
    }

    public void setRejectedReports(long rejectedReports) {
        this.rejectedReports = rejectedReports;
    }

    public void setTotalReports(long totalReports) {
        this.totalReports = totalReports;
    }

    public void setValidatedReports(long validatedReports) {
        this.validatedReports = validatedReports;
    }
}