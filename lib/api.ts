export interface OpenRouterModel {
    id: string;
    name: string;
    description?: string;
    created?: number;
    pricing?: {
      prompt: string;
      completion: string;
      image?: string;
      request?: string;
      input_cache_read?: string;
      input_cache_write?: string;
      web_search?: string;
      internal_reasoning?: string;
    };
    context_length?: number;
    architecture: {
      tokenizer?: string;
      modality?: string;
      input_modalities: string[];
      output_modalities: string[];
    };
    top_provider?: {
      is_moderated?: boolean;
    };
    hugging_face_id?: string;
    per_request_limits?: Record<string, unknown>;
    supported_parameters?: string[];
  }
  
  export async function fetchModels(apiKey?: string): Promise<OpenRouterModel[]> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }
  
    try {
      const response = await fetch('https://openrouter.ai/api/v1/models?category=programming', {
        headers,
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      throw error;
    }
  }
  