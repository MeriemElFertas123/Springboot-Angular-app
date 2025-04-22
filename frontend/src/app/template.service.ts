import { Injectable } from '@angular/core';

interface ReportSection {
  title: string;
  content?: string;
  subsections?: string[];
  mandatory?: boolean;
}

interface ReportTemplate {
  title: string;
  description: string;
  sections: ReportSection[];
  defaultFileName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private readonly templates: Record<string, ReportTemplate> = {
    initiation: this.createInitiationTemplate(),
    pfe: this.createPFETemplate(),
    pfa: this.createPFATemplate()
  };

  getTemplateTypes(): string[] {
    return Object.keys(this.templates);
  }

  getTemplate(type: string): ReportTemplate {
    return this.templates[type] || this.templates['initiation'];
  }

  private createInitiationTemplate(): ReportTemplate {
    return {
      title: "Rapport de Stage d'Initiation",
      description: "Template pour les stages d'initiation de 1ère année",
      defaultFileName: "rapport_initiation_{date}",
      sections: [
        {
          title: "Page de garde",
          content: "À compléter avec vos informations personnelles",
          mandatory: true
        },
        {
          title: "Introduction",
          mandatory: true,
          subsections: [
            "1.1 Contexte du stage",
            "1.2 Objectifs pédagogiques",
            "1.3 Démarche méthodologique"
          ]
        },
        {
          title: "Entreprise d'accueil",
          subsections: [
            "2.1 Présentation de l'entreprise",
            "2.2 Service d'accueil",
            "2.3 Missions confiées"
          ]
        },
        {
          title: "Bilan et perspectives",
          mandatory: true
        }
      ]
    };
  }

  private createPFETemplate(): ReportTemplate {
    return {
      title: "Rapport de Projet de Fin d'Études",
      description: "Template pour les PFE de cycle ingénieur",
      defaultFileName: "pfe_{nom}_{annee}",
      sections: [
        {
          title: "Page de titre",
          mandatory: true
        },
        {
          title: "Remerciements"
        },
        {
          title: "Introduction générale",
          mandatory: true
        },
        {
          title: "Partie technique",
          subsections: [
            "1. Analyse des besoins",
            "2. Conception",
            "3. Réalisation",
            "4. Tests et validation"
          ],
          mandatory: true
        }
      ]
    };
  }

  private createPFATemplate(): ReportTemplate {
    return {
      title: "Rapport de Projet de Fin d'Année",
      description: "Template pour les PFA de 2ème année",
      defaultFileName: "pfa_{date}",
      sections: [
        {
          title: "Introduction",
          mandatory: true,
          subsections: [
            "Contexte du projet",
            "Objectifs",
            "Plan du rapport"
          ]
        },
        {
          title: "Développement",
          mandatory: true,
          subsections: [
            "Analyse",
            "Solutions techniques",
            "Résultats obtenus"
          ]
        }
      ]
    };
  }

  generateMarkdownContent(template: ReportTemplate): string {
    let content = `# ${template.title}\n\n`;
    
    template.sections.forEach(section => {
      content += `## ${section.title}\n`;
      
      if (section.content) {
        content += `${section.content}\n\n`;
      }
      
      if (section.subsections) {
        section.subsections.forEach(sub => {
          content += `### ${sub}\n[Contenu à rédiger]\n\n`;
        });
      }
      
      content += '\n';
    });
    
    return content;
  }

  getDefaultFileName(templateType: string): string {
    const template = this.getTemplate(templateType);
    return template.defaultFileName
      .replace('{date}', new Date().toISOString().split('T')[0])
      .replace('{nom}', 'etudiant')
      .replace('{annee}', new Date().getFullYear().toString());
  }
}