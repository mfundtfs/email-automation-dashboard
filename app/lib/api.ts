// API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';

// Unsubscribe response interface
export interface UnsubscribeResponse {
  data: {
    is_subscribed: number;
    k: string;
    receiver_email: string;
    sender_email: string;
  };
  message: string;
  status: number;
}

// Unsubscribe request interface
export interface UnsubscribeRequest {
  k: string;
  to: string;
  from: string;
}

/**
 * Unsubscribe from email notifications
 */
export const unsubscribeEmail = async (
  payload: UnsubscribeRequest
): Promise<UnsubscribeResponse> => {
  const response = await fetch(`${API_BASE_URL}email_tracking/unsub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Failed to unsubscribe: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const api = {
  unsubscribeEmail,
};
