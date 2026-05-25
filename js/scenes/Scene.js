export class Scene {
    constructor(id) {
        this.id = id;
    }
    
    getText(gameState) {
        return { text: 'Сцена не реализована', choices: [] };
    }
    
    processChoice(choiceId, gameState, userInput = null) {
        return this.id;
    }
}