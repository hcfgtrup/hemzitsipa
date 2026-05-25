import { GameConstants } from '../utils/constants.js';

export class CipherService {
    static caesarDecrypt(text, shift) {
        const alphabet = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
        const lowerAlphabet = alphabet.toLowerCase();
        
        return text.split('').map(char => {
            if (lowerAlphabet.includes(char)) {
                const index = lowerAlphabet.indexOf(char);
                const newIndex = (index - shift + lowerAlphabet.length) % lowerAlphabet.length;
                return lowerAlphabet[newIndex];
            }
            if (alphabet.includes(char)) {
                const index = alphabet.indexOf(char);
                const newIndex = (index - shift + alphabet.length) % alphabet.length;
                return alphabet[newIndex];
            }
            return char;
        }).join('');
    }
    
    static checkAnswer(userAnswer) {
        const normalized = userAnswer.toUpperCase().replace(/\s+/g, ' ').trim();
        const correct = GameConstants.CIPHER.CORRECT_ANSWER;
        return normalized === correct;
    }
}