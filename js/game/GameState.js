export class GameState {
    constructor() {
        this.currentScene = 'start';
        this.professionalism = 0;
        this.personalFeelings = 0;
        this.internTrust = 0;
        this.cipherAttempts = 0;
        this.unlockedCharacters = [];
        this.flags = {};
        this.gameOver = false;
        this.playerName = localStorage.getItem('playerName') || 'ДЕТЕКТИВ';
    }
    
    updateStats(changes) {
        if (changes.professionalism) this.professionalism += changes.professionalism;
        if (changes.personalFeelings) this.personalFeelings += changes.personalFeelings;
        if (changes.internTrust) this.internTrust += changes.internTrust;
        
        this.professionalism = Math.max(0, Math.min(100, this.professionalism));
        this.personalFeelings = Math.max(0, Math.min(100, this.personalFeelings));
        this.internTrust = Math.max(-50, Math.min(100, this.internTrust));
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
            playerName: this.playerName
        };
    }
    
    fromJSON(data) {
        this.currentScene = data.currentScene || 'start';
        this.professionalism = data.professionalism || 0;
        this.personalFeelings = data.personalFeelings || 0;
        this.internTrust = data.internTrust || 0;
        this.cipherAttempts = data.cipherAttempts || 0;
        this.unlockedCharacters = data.unlockedCharacters || [];
        this.flags = data.flags || {};
        this.gameOver = data.gameOver || false;
        this.playerName = data.playerName || localStorage.getItem('playerName') || 'ДЕТЕКТИВ';
    }
}