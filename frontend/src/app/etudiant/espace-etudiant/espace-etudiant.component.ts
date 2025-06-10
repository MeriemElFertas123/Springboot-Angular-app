import { Component ,HostListener, OnInit} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { SideBarEtudiantComponent } from "../side-bar-etudiant/side-bar-etudiant.component";
import { UserProfileMenuComponent } from "../../user-profile-menu/user-profile-menu.component";

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QaService } from '../../service/qa-service.service'; // <-- Import du service

interface Reply {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
}

interface Question {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

interface NewQuestion {
  title: string;
  content: string;
  category: string;
}

interface Category {
  value: string;
  label: string;
}








@Component({
  selector: 'app-espace-etudiant',
  standalone: true,
  imports: [RouterModule, RouterLink, SideBarEtudiantComponent, UserProfileMenuComponent,
    CommonModule, FormsModule, ReactiveFormsModule, SideBarEtudiantComponent
  ],
  templateUrl: './espace-etudiant.component.html',
  styleUrl: './espace-etudiant.component.css'
})
export class EspaceEtudiantComponent implements OnInit {

   constructor(public qaService: QaService,private router:Router) {}

  navigateToAjouterStage() {
    this.router.navigate(['/ajouterStage']);
  }
  
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  // Fermer le menu si on clique à l'extérieur
  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const userProfile = document.querySelector('.user-profile');
    if (userProfile && !userProfile.contains(event.target as Node)) {
      this.isDropdownOpen = false;
    }
  }
  logout() {
    console.log("Déconnexion en cours...");
    // Implémente ici la logique de déconnexion, par ex. suppression du token, redirection
    this.router.navigate(['/login']);
  }
  profilePicture: string = '/img/profil2.png'; // Image par défaut

triggerFileInput() {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  fileInput.click();
}

updateProfilePicture(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.profilePicture = e.target.result; // Met à jour la photo de profil
    };
    reader.readAsDataURL(input.files[0]);
  }
}





// Student qa
 questions: Question[] = [];
  searchTerm: string = '';
  showNewQuestionForm: boolean = false;
  newQuestion: NewQuestion = { title: '', content: '', category: 'general' };
  expandedQuestions: Set<number> = new Set();
  replyInputs: { [key: number]: string } = {};
  filterCategory: string = 'all';
  loading: boolean = false;
  error: string = '';

  categories: Category[] = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'rapport', label: 'Rapport de stage' },
    { value: 'procedure', label: 'Procédures' },
    { value: 'technique', label: 'Technique' },
    { value: 'general', label: 'Général' }
  ];

 

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.loading = true;
    this.error = '';
    this.qaService.getQuestions().subscribe({
      next: (questions) => {
        // Initialiser les replies si elles sont null
        this.questions = questions.map(question => ({
          ...question,
          replies: question.replies || []
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des questions:', error);
        this.error = 'Erreur lors du chargement des questions';
        this.loading = false;
        // Fallback vers des données mock en cas d'erreur
        this.loadMockData();
      }
    });
  }

  loadMockData(): void {
    this.questions = [
      {
        id: 1,
        title: "Comment structurer un rapport de stage ?",
        content: "Bonjour, je commence mon rapport de stage et j'aimerais savoir quelle est la structure recommandée. Quelles sont les parties essentielles à inclure ?",
        author: "Marie Dubois",
        category: "rapport",
        createdAt: "2025-06-05T10:30:00Z",
        likes: 8,
        isLiked: false,
        replies: [
          {
            id: 101,
            content: "Généralement, il faut inclure : introduction, présentation de l'entreprise, missions réalisées, analyse critique et conclusion. N'oublie pas les annexes !",
            author: "Thomas Martin",
            createdAt: "2025-06-05T14:20:00Z",
            likes: 5,
            isLiked: true
          },
          {
            id: 102,
            content: "Je recommande aussi d'ajouter une partie sur les compétences acquises et les perspectives d'évolution. Ça donne plus de valeur au rapport.",
            author: "Sarah Petit",
            createdAt: "2025-06-05T16:45:00Z",
            likes: 3,
            isLiked: false
          }
        ]
      },
      {
        id: 2,
        title: "Délai de validation des rapports",
        content: "Quelqu'un sait combien de temps prennent les enseignants pour valider nos rapports en général ?",
        author: "Pierre Durand",
        category: "procedure",
        createdAt: "2025-06-04T09:15:00Z",
        likes: 12,
        isLiked: true,
        replies: [
          {
            id: 201,
            content: "D'après mon expérience, ça prend entre 1 et 2 semaines en général. Mais ça peut varier selon la période.",
            author: "Julie Moreau",
            createdAt: "2025-06-04T11:30:00Z",
            likes: 4,
            isLiked: false
          }
        ]
      },
      {
        id: 3,
        title: "Problème de téléversement de fichier",
        content: "Mon rapport fait 15 MB et je n'arrive pas à le téléverser. Y a-t-il une limite de taille ?",
        author: "Alex Rousseau",
        category: "technique",
        createdAt: "2025-06-03T16:20:00Z",
        likes: 6,
        isLiked: false,
        replies: [
          {
            id: 301,
            content: "Oui, la limite est de 10 MB. Tu peux compresser ton PDF ou optimiser les images pour réduire la taille.",
            author: "Camille Leroy",
            createdAt: "2025-06-03T17:45:00Z",
            likes: 8,
            isLiked: true
          }
        ]
      }
    ];
  }

  get filteredQuestions(): Question[] {
    return this.questions.filter(question => {
      const matchesSearch = question.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           question.content.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = this.filterCategory === 'all' || question.category === this.filterCategory;
      return matchesSearch && matchesCategory;
    });
  }

  handleSubmitQuestion(): void {
    if (this.newQuestion.title.trim() && this.newQuestion.content.trim()) {
      this.loading = true;
      this.qaService.createQuestion(this.newQuestion).subscribe({
        next: (question) => {
          // Assurer que replies est initialisé
          const questionWithReplies = {
            ...question,
            replies: question.replies || []
          };
          this.questions.unshift(questionWithReplies);
          this.newQuestion = { title: '', content: '', category: 'general' };
          this.showNewQuestionForm = false;
          this.loading = false;
        },
        error: (error) => {
          console.error('Erreur lors de la création de la question:', error);
          this.error = 'Erreur lors de la création de la question';
          this.loading = false;
          
          // Fallback : ajouter localement en cas d'erreur backend
          const localQuestion: Question = {
            id: Date.now(),
            title: this.newQuestion.title,
            content: this.newQuestion.content,
            author: "Vous",
            category: this.newQuestion.category,
            createdAt: new Date().toISOString(),
            likes: 0,
            isLiked: false,
            replies: []
          };
          this.questions.unshift(localQuestion);
          this.newQuestion = { title: '', content: '', category: 'general' };
          this.showNewQuestionForm = false;
        }
      });
    }
  }

  handleLikeQuestion(questionId: number): void {
    const question = this.questions.find(q => q.id === questionId);
    if (question) {
      // Optimistic update (mettre à jour l'UI immédiatement)
      const wasLiked = question.isLiked;
      question.likes = question.isLiked ? question.likes - 1 : question.likes + 1;
      question.isLiked = !question.isLiked;

      this.qaService.likeQuestion(questionId).subscribe({
        next: (updatedQuestion) => {
          // Synchroniser avec la réponse du serveur
          const index = this.questions.findIndex(q => q.id === questionId);
          if (index !== -1) {
            this.questions[index] = {
              ...updatedQuestion,
              replies: updatedQuestion.replies || []
            };
          }
        },
        error: (error) => {
          console.error('Erreur lors du like de la question:', error);
          // Annuler l'optimistic update en cas d'erreur
          question.isLiked = wasLiked;
          question.likes = wasLiked ? question.likes + 1 : question.likes - 1;
        }
      });
    }
  }

  handleLikeReply(questionId: number, replyId: number): void {
    const question = this.questions.find(q => q.id === questionId);
    if (question && question.replies) {
      const reply = question.replies.find(r => r.id === replyId);
      if (reply) {
        // Optimistic update
        const wasLiked = reply.isLiked;
        reply.likes = reply.isLiked ? reply.likes - 1 : reply.likes + 1;
        reply.isLiked = !reply.isLiked;

        this.qaService.likeReply(questionId, replyId).subscribe({
          next: (updatedReply) => {
            // Synchroniser avec la réponse du serveur
            Object.assign(reply, updatedReply);
          },
          error: (error) => {
            console.error('Erreur lors du like de la réponse:', error);
            // Annuler l'optimistic update en cas d'erreur
            reply.isLiked = wasLiked;
            reply.likes = wasLiked ? reply.likes + 1 : reply.likes - 1;
          }
        });
      }
    }
  }

  handleSubmitReply(questionId: number): void {
    const replyContent = this.replyInputs[questionId];
    if (replyContent && replyContent.trim()) {
      const newReply = {
        content: replyContent,
        author: "Vous"
      };

      this.qaService.addReply(questionId, newReply).subscribe({
        next: (reply) => {
          const question = this.questions.find(q => q.id === questionId);
          if (question) {
            // Initialiser replies si c'est null
            if (!question.replies) {
              question.replies = [];
            }
            question.replies.push(reply);
            this.replyInputs[questionId] = '';
          }
        },
        error: (error) => {
          console.error('Erreur lors de l\'ajout de la réponse:', error);
          this.error = 'Erreur lors de l\'ajout de la réponse';
          
          // Fallback : ajouter localement en cas d'erreur
          const localReply: Reply = {
            id: Date.now(),
            content: replyContent,
            author: "Vous",
            createdAt: new Date().toISOString(),
            likes: 0,
            isLiked: false
          };
          
          const question = this.questions.find(q => q.id === questionId);
          if (question) {
            // Initialiser replies si c'est null
            if (!question.replies) {
              question.replies = [];
            }
            question.replies.push(localReply);
            this.replyInputs[questionId] = '';
          }
        }
      });
    }
  }

  toggleExpanded(questionId: number): void {
    if (this.expandedQuestions.has(questionId)) {
      this.expandedQuestions.delete(questionId);
    } else {
      this.expandedQuestions.add(questionId);
    }
  }

  isExpanded(questionId: number): boolean {
    return this.expandedQuestions.has(questionId);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  getCategoryLabel(category: string): string {
    return this.categories.find(cat => cat.value === category)?.label || category;
  }

  getCategoryColor(category: string): string {
    const colors: { [key: string]: string } = {
      'rapport': 'category-rapport',
      'procedure': 'category-procedure',
      'technique': 'category-technique',
      'general': 'category-general'
    };
    return colors[category] || 'category-general';
  }

  onEnterKey(event: KeyboardEvent, questionId: number): void {
    if (event.key === 'Enter') {
      this.handleSubmitReply(questionId);
    }
  }

  // Méthode utilitaire pour rafraîchir les données
  refreshQuestions(): void {
    this.loadQuestions();
  }

  // Méthode pour effacer les erreurs
  clearError(): void {
    this.error = '';
  }
}