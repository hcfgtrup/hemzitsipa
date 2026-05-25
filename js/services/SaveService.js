import { GameConstants } from '../utils/constants.js';

export class SaveService {
    static save(gameState) {
        try {
            const saveData = {
                version: GameConstants.VERSION,
                timestamp: Date.now(),
                state: gameState.toJSON()
            };
            localStorage.setItem(GameConstants.STORAGE_KEY, JSON.stringify(saveData));
            return true;
        } catch (e) {
            console.error('Save failed:', e);
            return false;
        }
    }
    
    static load(gameState) {
        try {
            const saved = localStorage.getItem(GameConstants.STORAGE_KEY);
            if (!saved) return false;
            const saveData = JSON.parse(saved);
            gameState.fromJSON(saveData.state);
            return true;
        } catch (e) {
            console.error('Load failed:', e);
            return false;
        }
    }
    
    static hasSave() {
        return localStorage.getItem(GameConstants.STORAGE_KEY) !== null;
    }
    
    static deleteSave() {
        localStorage.removeItem(GameConstants.STORAGE_KEY);
    }
}