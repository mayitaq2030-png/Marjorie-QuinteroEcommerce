
import { GoogleGenAI } from "@google/genai";
import { PRODUCTS } from "./constants";

export const getShoppingAdviceStream = async (userPrompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const productContext = PRODUCTS.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n');
    
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `Eres un asistente de compras personal experto en moda urbana para la marca URBANA.
            Tu objetivo es ayudar al usuario a encontrar las mejores prendas de nuestro catálogo y dar consejos de estilo.
            
            PRODUCTOS DISPONIBLES EN TIENDA:
            ${productContext}
            
            INSTRUCCIONES:
            - Responde de forma amable, moderna y profesional.
            - Si el usuario pregunta por tendencias generales, puedes usar tus conocimientos para responder.
            - Siempre intenta vincular la respuesta con algún producto de nuestro catálogo si es pertinente.
            - Usa un tono cercano pero distinguido.
            
            CONSULTA DEL USUARIO:
            ${userPrompt}`
          }]
        }
      ],
      config: {
        tools: [{ googleSearch: {} }]
      }
    });

    return responseStream;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
