// API Types
export interface EmailRecord {
  id: number;
  sender_email: string;
  receiver_email: string;
  status: string;
  status_message: string;
  sent_at: string;
  responds: string;
  subject: string | null;
  body: string | null;
  first_name: string;
  company: string;
  created_at: string;
}

export interface PaginationInfo {
  page: number;
  per_page: number;
  total_pages: number;
  total_records: number;
}

export interface FiltersApplied {
  date: string | null;
  receiver_email: string | null;
  sender_email: string | null;
}

export interface EmailListResponse {
  status: number;
  message: string;
  data: {
    records: EmailRecord[];
    pagination: PaginationInfo;
    filters_applied: FiltersApplied;
  };
}

export interface EmailListRequest {
  page: number;
  per_page: number;
  date: string;
}

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://tfshrms.cloud/email/';

// API Service
export const emailApi = {
  async getEmails(request: EmailListRequest): Promise<EmailListResponse> {
    const response = await fetch(`${API_BASE_URL}email_send_import/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },
};
