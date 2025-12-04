export interface IUserData {
  fullName: string;
  phone: string;
  email: string;
  description: string;
  topics: string[];
  tags: string[];
}

export interface TicketData {
  fullName: string;
  phone: string;
  email: string;
  description: string;
  token?: string[]
}

export interface ContactUsData {
  id: number;
  topic: string;
  subtopics: Subtopic[];
  link?: string;
}

export interface SubIssueArr {
  id: string;
  title: string
}

export interface Subtopic {
  id: number;
  title: string;
  hasAttachment?: boolean;
  message?: string;
  link?: string;
  subtopics?: Subtopic[];
  disableSubmit?: boolean;

}

export interface Topic {
  id: number;
  topic: string;
  subtopics?: Subtopic[];
  link?: string;
}