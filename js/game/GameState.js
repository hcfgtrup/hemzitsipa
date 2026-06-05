export class GameState {
    constructor() {
        this.currentScene = 'welcome';
        this.professionalism = 0;
        this.personalFeelings = 0;
        this.internTrust = 0;
        this.cipherAttempts = 0;
        this.unlockedCharacters = [];
        this.flags = {};
        this.gameOver = false;
        this.gameOverReason = null;
        this.playerName = localStorage.getItem('playerName') || 'ДЕТЕКТИВ';
    }
    
    updateStats(changes) {
        if (changes.professionalism !== undefined) this.professionalism += changes.professionalism;
        if (changes.personalFeelings !== undefined) this.personalFeelings += changes.personalFeelings;
        if (changes.internTrust !== undefined) this.internTrust += changes.internTrust;
        
        // Проверка на Game Over
        if (this.professionalism < 0) {
            this.gameOver = true;
            this.gameOverReason = 'professionalism';
            return false;
        }
        if (this.personalFeelings < 0) {
            this.gameOver = true;
            this.gameOverReason = 'feelings';
            return false;
        }
        if (this.internTrust < 0) {
            this.gameOver = true;
            this.gameOverReason = 'trust';
            return false;
        }
        
        return true;
    }
    
    setFlag(flag, value = true) {
        this.flags[flag] = value;
    }
    
    getFlag(flag) {
        return this.flags[flag] || false;
    }
    
    toJSON() {
        return {
            currentScene: this.currentScene,
            professionalism: this.professionalism,
            personalFeelings: this.personalFeelings,
            internTrust: this.internTrust,
            cipherAttempts: this.cipherAttempts,
            unlockedCharacters: this.unlockedCharacters,
            flags: this.flags,
            gameOver: this.gameOver,
            gameOverReason: this.gameOverReason,
            playerName: this.playerName
        };
    }
    
    fromJSON(data) {
        this.currentScene = data.currentScene || 'welcome';
        this.professionalism = data.professionalism || 0;
        this.personalFeelings = data.personalFeelings || 0;
        this.internTrust = data.internTrust || 0;
        this.cipherAttempts = data.cipherAttempts || 0;
        this.unlockedCharacters = data.unlockedCharacters || [];
        this.flags = data.flags || {};
        this.gameOver = data.gameOver || false;
        this.gameOverReason = data.gameOverReason || null;
        this.playerName = data.playerName || localStorage.getItem('playerName') || 'ДЕТЕКТИВ';
    }
}