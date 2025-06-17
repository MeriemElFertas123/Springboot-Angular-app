import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SideBarAdminComponent } from "../side-bar-admin/side-bar-admin.component";
import Chart from 'chart.js/auto';
import { DashboardService } from '../../service/dashboard.service';

// Interfaces
interface Deadline {
  id: number;
  title: string;
  date: Date;
  description: string;
  priority: 'low' | 'medium' | 'high';
  progress: number;
  isUrgent: boolean;
  daysRemaining: number;
  urgencyClass: string;
}

interface Activity {
  id: number;
  type: 'report' | 'user' | 'system';
  avatar: string;
  message: string;
  timestamp: Date;
  status: 'success' | 'warning' | 'error';
}

interface ChartDataPoint {
  label: string;
  value: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, SideBarAdminComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  
  // ViewChild pour les graphiques
  @ViewChild('reportsChart', { static: false }) reportsChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('statusChart', { static: false }) statusChartRef!: ElementRef<HTMLCanvasElement>;
  
  // Données principales
  totalReports: number = 0;
  validatedReports: number = 0;
  pendingReports: number = 0;
  rejectedReports: number = 0;
  activeStudents: number = 0;
  activeTeachers: number = 0;
  
  // Données animées pour les compteurs
  animatedTotalReports: number = 0;
  animatedValidatedReports: number = 0;
  animatedPendingReports: number = 0;
  animatedRejectedReports: number = 0;
  animatedActiveStudents: number = 0;
  animatedActiveTeachers: number = 0;
  
  // Configuration des graphiques
  private reportsChart: Chart | null = null;
  private statusChart: Chart | null = null;
  private chartPeriod: 'week' | 'month' | 'year' = 'month';
  
  // Check if running in browser
  private isBrowser: boolean;
  
  // Données des échéances
  deadlines: Deadline[] = [
    {
      id: 1,
      title: 'Rapport de stage - Semestre 1',
      date: new Date('2025-06-15'),
      description: 'Date limite pour le dépôt des rapports de stage du premier semestre',
      priority: 'high',
      progress: 65,
      isUrgent: true,
      daysRemaining: 15,
      urgencyClass: 'critical'
    },
    {
      id: 2,
      title: 'Évaluation des enseignements',
      date: new Date('2025-06-30'),
      description: 'Période d\'évaluation des cours par les étudiants',
      priority: 'medium',
      progress: 30,
      isUrgent: false,
      daysRemaining: 30,
      urgencyClass: 'warning'
    },
    {
      id: 3,
      title: 'Projet de fin d\'année',
      date: new Date('2025-07-15'),
      description: 'Soumission des projets de fin d\'année',
      priority: 'high',
      progress: 45,
      isUrgent: false,
      daysRemaining: 45,
      urgencyClass: 'normal'
    }
  ];
  
  // Activités récentes
  recentActivities: Activity[] = [
    {
      id: 1,
      type: 'report',
      avatar: '📄',
      message: 'Nouveau rapport déposé par Marie Dupont',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      status: 'success'
    },
    {
      id: 2,
      type: 'user',
      avatar: '👤',
      message: '3 nouveaux étudiants inscrits',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      status: 'success'
    },
    {
      id: 3,
      type: 'system',
      avatar: '⚙️',
      message: 'Maintenance système programmée pour demain',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      status: 'warning'
    },
    {
      id: 4,
      type: 'report',
      avatar: '✅',
      message: 'Rapport validé pour Jean Martin',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      status: 'success'
    },
    {
      id: 5,
      type: 'system',
      avatar: '🔄',
      message: 'Sauvegarde automatique effectuée',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'success'
    }
  ];
  
  // Intervalles pour les animations
  private animationIntervals: any[] = [];
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dashboardService: DashboardService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  
  ngOnInit(): void {
    this.calculateDeadlineUrgency();
    this.loadDashboardData();
  }
  
  ngAfterViewInit(): void {
    if (!this.isBrowser) return;

    const initCharts = () => {
      if (this.reportsChartRef?.nativeElement && this.statusChartRef?.nativeElement) {
        this.initializeCharts();
      } else {
        console.warn('Canvas elements not found, retrying...');
        setTimeout(initCharts, 500);
      }
    };

    setTimeout(initCharts, 100);
  }
  
  ngOnDestroy(): void {
    // Nettoyer les intervalles
    this.animationIntervals.forEach(interval => clearInterval(interval));
    
    // Détruire les graphiques
    if (this.reportsChart) {
      this.reportsChart.destroy();
    }
    if (this.statusChart) {
      this.statusChart.destroy();
    }
  }
  
  // Méthodes utilitaires
  getCurrentTime(): string {
    return new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  getValidationRate(): number {
    if (this.totalReports === 0) return 0;
    return Math.round((this.validatedReports / this.totalReports) * 100);
  }
  
  // Set final values without animation (for SSR)
  private setFinalCounterValues(): void {
    this.animatedTotalReports = this.totalReports;
    this.animatedValidatedReports = this.validatedReports;
    this.animatedPendingReports = this.pendingReports;
    this.animatedRejectedReports = this.rejectedReports;
    this.animatedActiveStudents = this.activeStudents;
    this.animatedActiveTeachers = this.activeTeachers;
  }
  
  // Animation des compteurs (only in browser)
  startCounterAnimations(): void {
    if (!this.isBrowser) return;
    
    this.animateCounter('totalReports', this.totalReports, 2000);
    this.animateCounter('validatedReports', this.validatedReports, 2200);
    this.animateCounter('pendingReports', this.pendingReports, 2400);
    this.animateCounter('rejectedReports', this.rejectedReports, 2600);
    this.animateCounter('activeStudents', this.activeStudents, 2800);
    this.animateCounter('activeTeachers', this.activeTeachers, 3000);
  }
  
  private animateCounter(property: string, target: number, duration: number): void {
    if (!this.isBrowser) return;
    
    const start = 0;
    const startTime = Date.now();
    
    const animatedProperty = `animated${property.charAt(0).toUpperCase() + property.slice(1)}` as keyof this;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Fonction d'easing (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * easeOut);
      
      (this as any)[animatedProperty] = current;
      
      if (progress < 1 && this.isBrowser) {
        requestAnimationFrame(animate);
      }
    };
    
    if (this.isBrowser) {
      requestAnimationFrame(animate);
    }
  }
  
  // Gestion des échéances
  calculateDeadlineUrgency(): void {
    const now = new Date();
    
    this.deadlines.forEach(deadline => {
      const timeDiff = deadline.date.getTime() - now.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      deadline.daysRemaining = daysDiff;
      deadline.isUrgent = daysDiff <= 7;
      
      if (daysDiff <= 7) {
        deadline.urgencyClass = 'critical';
      } else if (daysDiff <= 30) {
        deadline.urgencyClass = 'warning';
      } else {
        deadline.urgencyClass = 'normal';
      }
    });
  }
  
  // Initialisation des graphiques
  private initializeCharts(): void {
    if (!this.isBrowser) return;
    
    this.createReportsChart();
    this.createStatusChart();
  }
  
  private createReportsChart(): void {
    if (!this.isBrowser || !this.reportsChartRef?.nativeElement) return;
    
    const ctx = this.reportsChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    
    // Données initiales en attendant les données du backend
    const initialData = {
      labels: [],
      datasets: [{
        label: 'Rapports déposés',
        data: [],
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };
    
    this.reportsChart = new Chart(ctx, {
      type: 'line',
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(37, 99, 235, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false
          }
        },
        scales: {
          x: {
            border: {
              display: false
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              color: '#6B7280',
              font: {
                size: 12
              }
            }
          },
          y: {
            beginAtZero: true,
            border: {
              display: false
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              color: '#6B7280',
              font: {
                size: 12
              }
            }
          }
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 6,
            backgroundColor: 'rgb(37, 99, 235)',
            borderColor: 'white',
            borderWidth: 2
          },
          line: {
            tension: 0.4
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });
  }
  
  private createStatusChart(): void {
    if (!this.isBrowser || !this.statusChartRef?.nativeElement) return;
    
    const ctx = this.statusChartRef.nativeElement.getContext('2d');
    if (!ctx) return;
    
    // Données initiales en attendant les données du backend
    const initialData = {
      labels: ['Validés', 'En attente', 'Refusés'],
      datasets: [{
        data: [0, 0, 0],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(239, 68, 68)'
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        hoverBorderWidth: 3
      }]
    };
    
    this.statusChart = new Chart(ctx, {
      type: 'doughnut',
      data: initialData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              font: {
                size: 12
              },
              color: '#374151'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            cornerRadius: 8,
            callbacks: {
              label: (context) => {
                const total = context.dataset.data.reduce((a, b) => (a as number) + (b as number), 0) as number;
                const percentage = total > 0 ? Math.round(((context.parsed as number) / total) * 100) : 0;
                return `${context.label}: ${context.parsed} (${percentage}%)`;
              }
            }
          }
        },
        cutout: '60%',
        elements: {
          arc: {
            borderWidth: 2
          }
        }
      }
    });
  }
  
  // Chargement des données
  private loadDashboardData(): void {
    this.dashboardService.getDashboardStats().subscribe({
      next: (data) => {
        this.totalReports = data.totalReports;
        this.validatedReports = data.validatedReports;
        this.pendingReports = data.pendingReports;
        this.rejectedReports = data.rejectedReports;
        this.activeStudents = data.activeStudents;
        this.activeTeachers = data.activeTeachers;
        
        // Mettre à jour le graphique en donut
        if (this.statusChart) {
          this.statusChart.data.datasets[0].data = [
            this.validatedReports,
            this.pendingReports,
            this.rejectedReports
          ];
          this.statusChart.update('none');
        }
        
        // Only start animations in browser environment
        if (this.isBrowser) {
          this.startCounterAnimations();
        } else {
          this.setFinalCounterValues();
        }
      },
      error: (err) => {
        console.error('Error loading dashboard data:', err);
        this.setFinalCounterValues();
      }
    });

    this.dashboardService.getReportsEvolution(this.chartPeriod).subscribe({
      next: (data) => {
        if (this.reportsChart) {
          this.reportsChart.data = this.transformEvolutionData(data);
          this.reportsChart.update();
        }
      },
      error: (err) => {
        console.error('Error loading reports evolution:', err);
      }
    });

    // Only simulate real-time updates in browser
    if (this.isBrowser) {
      this.simulateRealTimeUpdates();
    }
  }

  private transformEvolutionData(data: any): any {
    return {
      labels: data.labels,
      datasets: [{
        label: 'Rapports déposés',
        data: data.values,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4
      }]
    };
  }
  
  // Simulation de mises à jour en temps réel
  private simulateRealTimeUpdates(): void {
    if (!this.isBrowser) return;
    
    const interval = setInterval(() => {
      // Variation aléatoire des données pour la démo
      const variation = Math.floor(Math.random() * 3) - 1;
      
      if (Math.random() > 0.8) { // 20% de chance de mise à jour
        const oldTotal = this.totalReports;
        this.totalReports += Math.max(0, variation);
        
        if (this.totalReports !== oldTotal) {
          const diff = this.totalReports - oldTotal;
          this.pendingReports += diff;
          
          if (this.statusChart) {
            this.statusChart.data.datasets[0].data = [
              this.validatedReports,
              this.pendingReports,
              this.rejectedReports
            ];
            this.statusChart.update('none');
          }
        }
      }
    }, 15000);
    
    this.animationIntervals.push(interval);
  }
  
  // Gestionnaires d'événements
  setChartPeriod(period: 'week' | 'month' | 'year'): void {
    this.chartPeriod = period;
    
    this.dashboardService.getReportsEvolution(period).subscribe({
      next: (data) => {
        if (this.reportsChart) {
          this.reportsChart.data = this.transformEvolutionData(data);
          this.reportsChart.update();
        }
      },
      error: (err) => {
        console.error('Error loading reports evolution:', err);
      }
    });
  }
  
  onCardHover(event: MouseEvent): void {
    if (!this.isBrowser) return;
    
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'translateY(-8px) scale(1.02)';
    card.style.transition = 'transform 0.3s ease';
  }
  
  onCardLeave(event: MouseEvent): void {
    if (!this.isBrowser) return;
    
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'translateY(0) scale(1)';
  }
  
  // Gestion des échéances
  openDeadlineModal(): void {
    console.log('Ouverture du modal d\'ajout d\'échéance');
  }
  
  editDeadline(deadline: Deadline): void {
    console.log('Édition de l\'échéance:', deadline);
  }
  
  deleteDeadline(deadlineId: number): void {
    if (this.isBrowser && confirm('Êtes-vous sûr de vouloir supprimer cette échéance ?')) {
      this.deadlines = this.deadlines.filter(d => d.id !== deadlineId);
    }
  }
  
  // Méthodes utilitaires pour les templates 
  getStatusClass(status: string): string {
    switch (status) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  }
  
  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
  
  getProgressColor(progress: number): string {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  }
  
  // Méthodes de rafraîchissement manuel
  refreshDashboard(): void {
    if (!this.isBrowser) return;
    
    this.loadDashboardData();
  }
}