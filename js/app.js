import { GameState } from './game/GameState.js';
import { SceneManager } from './game/SceneManager.js';
import { SaveService } from './services/SaveService.js';
import { CharactersData } from './data/characters.js';

class HemzitsipaGame {
    constructor() {
        this.gameState = new GameState();
        this.sceneManager = new SceneManager();
        this.music = document.getElementById('bgMusic');
        this.musicPlaying = false;
        this.unlockedCharacters = [];
        this.playerName = localStorage.getItem('playerName') || 'ДЕТЕКТИВ';
        this.fontSize = localStorage.getItem('fontSize') || 14;
        this.currentTheme = localStorage.getItem('theme') || 'bw';
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        } else {
            this.bindEvents();
        }
        this.initMusic();
        this.initFontSize();
        this.initTheme();
        this.checkForSave();
        this.showMainMenu();
    }
    
    initFontSize() {
        document.documentElement.style.setProperty('--font-size', this.fontSize + 'px');
    }
    
    setFontSize(size) {
        this.fontSize = size;
        localStorage.setItem('fontSize', size);
        document.documentElement.style.setProperty('--font-size', size + 'px');
    }
    
    initTheme() {
        if (this.currentTheme === 'color') {
            document.body.classList.add('color-theme');
            document.body.classList.remove('bw-theme');
        } else {
            document.body.classList.add('bw-theme');
            document.body.classList.remove('color-theme');
        }
    }
    
    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        if (theme === 'color') {
            document.body.classList.add('color-theme');
            document.body.classList.remove('bw-theme');
        } else {
            document.body.classList.add('bw-theme');
            document.body.classList.remove('color-theme');
        }
    }
    
    bindEvents() {
        const newGameBtn = document.getElementById('newGameBtn');
        const continueBtn = document.getElementById('continueBtn');
        const charactersBtn = document.getElementById('charactersBtn');
        const settingsBtn = document.getElementById('settingsBtn');
        
        const backToMenuFromChars = document.getElementById('backToMenuFromChars');
        const backToMenuFromDetail = document.getElementById('backToMenuFromDetail');
        const menuFromGame = document.getElementById('menuFromGame');
        const saveGameBtn = document.getElementById('saveGameBtn');
        const resetFromGameBtn = document.getElementById('resetFromGameBtn');
        const toggleMusicBtn = document.getElementById('toggleMusicBtn');
        
        if (newGameBtn) newGameBtn.onclick = () => this.startNewGame();
        if (continueBtn) continueBtn.onclick = () => this.continueGame();
        if (charactersBtn) charactersBtn.onclick = () => this.showCharactersList();
        if (settingsBtn) settingsBtn.onclick = () => this.showSettingsModal();
        
        if (backToMenuFromChars) backToMenuFromChars.onclick = () => this.showMainMenu();
        if (backToMenuFromDetail) backToMenuFromDetail.onclick = () => this.showCharactersList();
        if (menuFromGame) menuFromGame.onclick = () => this.backToMenu();
        if (saveGameBtn) saveGameBtn.onclick = () => this.saveGame();
        if (resetFromGameBtn) resetFromGameBtn.onclick = () => this.resetGame();
        if (toggleMusicBtn) toggleMusicBtn.onclick = () => this.toggleMusic();
    }
    
    showSettingsModal() {
        const existingModal = document.getElementById('settingsModal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.id = 'settingsModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>НАСТРОЙКИ</h3>
                
                <div class="settings-group">
                    <label>СМЕНИТЬ ИМЯ</label>
                    <button id="changeNameBtn">${this.playerName}</button>
                </div>
                
                <div class="settings-group">
                    <label>ТЕМА</label>
                    <div class="theme-buttons">
                        <button id="bwThemeBtn" class="theme-btn ${this.currentTheme === 'bw' ? 'active' : ''}">ЧЁРНО-БЕЛАЯ</button>
                        <button id="colorThemeBtn" class="theme-btn ${this.currentTheme === 'color' ? 'active' : ''}">ЦВЕТНАЯ</button>
                    </div>
                </div>
                
                <div class="settings-group">
                    <label>РАЗМЕР ШРИФТА: ${this.fontSize}</label>
                    <input type="range" id="fontSizeSlider" min="12" max="24" value="${this.fontSize}" step="1">
                </div>
                
                <div class="settings-group">
                    <label>ЗВУК</label>
                    <button id="modalToggleMusicBtn">${this.music.paused ? 'ВКЛЮЧИТЬ МУЗЫКУ' : 'ВЫКЛЮЧИТЬ МУЗЫКУ'}</button>
                </div>
                
                <div class="font-size-preview" id="fontPreview">
                    Пример текста: Игра продолжается
                </div>
                
                <button id="closeSettingsBtn" class="close-modal">ЗАКРЫТЬ</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const changeNameBtn = document.getElementById('changeNameBtn');
        const fontSizeSlider = document.getElementById('fontSizeSlider');
        const fontPreview = document.getElementById('fontPreview');
        const modalToggleMusicBtn = document.getElementById('modalToggleMusicBtn');
        const bwThemeBtn = document.getElementById('bwThemeBtn');
        const colorThemeBtn = document.getElementById('colorThemeBtn');
        const closeBtn = document.getElementById('closeSettingsBtn');
        
        if (changeNameBtn) {
            changeNameBtn.onclick = () => {
                modal.remove();
                this.showNameInput(true);
            };
        }
        
        if (bwThemeBtn) {
            bwThemeBtn.onclick = () => {
                this.setTheme('bw');
                bwThemeBtn.classList.add('active');
                colorThemeBtn.classList.remove('active');
            };
        }
        
        if (colorThemeBtn) {
            colorThemeBtn.onclick = () => {
                this.setTheme('color');
                colorThemeBtn.classList.add('active');
                bwThemeBtn.classList.remove('active');
            };
        }
        
        if (fontSizeSlider) {
            fontSizeSlider.oninput = (e) => {
                const size = e.target.value;
                const label = fontSizeSlider.parentElement.querySelector('label');
                if (label) label.innerHTML = `РАЗМЕР ШРИФТА: ${size}`;
                if (fontPreview) fontPreview.style.fontSize = size + 'px';
                this.setFontSize(parseInt(size));
            };
        }
        
        if (modalToggleMusicBtn) {
            modalToggleMusicBtn.onclick = () => {
                this.toggleMusic();
                modalToggleMusicBtn.innerText = this.music.paused ? 'ВКЛЮЧИТЬ МУЗЫКУ' : 'ВЫКЛЮЧИТЬ МУЗЫКУ';
            };
        }
        
        if (closeBtn) closeBtn.onclick = () => modal.remove();
        
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };
    }
    
    showNameInput(isFromSettings = false) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>ВВЕДИТЕ ИМЯ</h3>
                <input type="text" id="playerNameInput" maxlength="20" placeholder="ИМЯ ПЕРСОНАЖА" value="${this.playerName}">
                <button id="confirmNameBtn">ПРИНЯТЬ</button>
                <button id="closeNameBtn" class="close-modal">ОТМЕНА</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = document.getElementById('playerNameInput');
        const confirmBtn = document.getElementById('confirmNameBtn');
        const closeBtn = document.getElementById('closeNameBtn');
        
        confirmBtn.onclick = () => {
            const newName = input.value.trim().toUpperCase();
            if (newName) {
                this.playerName = newName;
                localStorage.setItem('playerName', newName);
                this.gameState.playerName = newName;
            }
            modal.remove();
            if (isFromSettings) {
                this.showSettingsModal();
            }
        };
        
        closeBtn.onclick = () => {
            modal.remove();
            if (isFromSettings) {
                this.showSettingsModal();
            }
        };
    }
    
    initMusic() {
        const savedMuted = localStorage.getItem('music_muted');
        if (savedMuted === 'true') {
            this.musicPlaying = false;
            this.music.pause();
        } else {
            this.music.volume = 0.3;
            this.music.play().catch(() => {
                const startMusic = () => {
                    this.music.play().catch(e => console.log('Music play error:', e));
                    this.musicPlaying = true;
                    document.body.removeEventListener('click', startMusic);
                };
                document.body.addEventListener('click', startMusic);
            });
            this.musicPlaying = true;
        }
    }
    
    checkForSave() {
        const continueBtn = document.getElementById('continueBtn');
        if (continueBtn) {
            continueBtn.style.display = SaveService.hasSave() ? 'block' : 'none';
        }
    }
    
    startNewGame() {
        this.gameState = new GameState();
        this.gameState.playerName = this.playerName;
        this.unlockedCharacters = [];
        for (const [id, char] of Object.entries(CharactersData)) {
            if (char.isUnlockedByDefault) {
                this.unlockedCharacters.push(id);
            }
        }
        SaveService.deleteSave();
        this.showNameInput();
        this.showGameInterface();
        this.render();
    }
    
    continueGame() {
        if (SaveService.load(this.gameState)) {
            this.unlockedCharacters = this.gameState.unlockedCharacters || [];
            if (this.unlockedCharacters.length === 0) {
                for (const [id, char] of Object.entries(CharactersData)) {
                    if (char.isUnlockedByDefault) {
                        this.unlockedCharacters.push(id);
                    }
                }
            }
            this.showGameInterface();
            this.render();
        } else {
            this.startNewGame();
        }
    }
    
    backToMenu() {
        this.saveUnlockedToState();
        SaveService.save(this.gameState);
        this.showMainMenu();
    }
    
    showMainMenu() {
        const mainMenu = document.getElementById('mainMenu');
        const charactersListPanel = document.getElementById('charactersListPanel');
        const characterDetailPanel = document.getElementById('characterDetailPanel');
        const gameInterface = document.getElementById('gameInterface');
        const musicControl = document.getElementById('musicControl');
        
        if (mainMenu) mainMenu.style.display = 'flex';
        if (charactersListPanel) charactersListPanel.style.display = 'none';
        if (characterDetailPanel) characterDetailPanel.style.display = 'none';
        if (gameInterface) gameInterface.style.display = 'none';
        if (musicControl) musicControl.style.display = 'none';
        
        const modal = document.getElementById('settingsModal');
        if (modal) modal.remove();
        
        this.checkForSave();
    }
    
    showGameInterface() {
        const mainMenu = document.getElementById('mainMenu');
        const charactersListPanel = document.getElementById('charactersListPanel');
        const characterDetailPanel = document.getElementById('characterDetailPanel');
        const gameInterface = document.getElementById('gameInterface');
        const musicControl = document.getElementById('musicControl');
        
        if (mainMenu) mainMenu.style.display = 'none';
        if (charactersListPanel) charactersListPanel.style.display = 'none';
        if (characterDetailPanel) characterDetailPanel.style.display = 'none';
        if (gameInterface) gameInterface.style.display = 'block';
        if (musicControl) musicControl.style.display = 'block';
    }
    
    showCharactersList() {
        this.saveUnlockedToState();
        this.renderCharactersList();
        
        const mainMenu = document.getElementById('mainMenu');
        const charactersListPanel = document.getElementById('charactersListPanel');
        const characterDetailPanel = document.getElementById('characterDetailPanel');
        const gameInterface = document.getElementById('gameInterface');
        
        if (mainMenu) mainMenu.style.display = 'none';
        if (charactersListPanel) charactersListPanel.style.display = 'block';
        if (characterDetailPanel) characterDetailPanel.style.display = 'none';
        if (gameInterface) gameInterface.style.display = 'none';
    }
    
    showCharacterDetail(characterId, characterData) {
        this.renderCharacterDetail(characterId, characterData);
        
        const charactersListPanel = document.getElementById('charactersListPanel');
        const characterDetailPanel = document.getElementById('characterDetailPanel');
        
        if (charactersListPanel) charactersListPanel.style.display = 'none';
        if (characterDetailPanel) characterDetailPanel.style.display = 'block';
    }
    
    renderCharactersList() {
        const container = document.getElementById('charactersList');
        if (!container) return;
        container.innerHTML = '';
        
        for (const [id, char] of Object.entries(CharactersData)) {
            const isUnlocked = this.unlockedCharacters.includes(id);
            
            const card = document.createElement('div');
            card.className = `character-list-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            let avatarHtml;
            if (char.avatar && isUnlocked) {
                avatarHtml = `<img src="${char.avatar}" class="character-list-avatar" alt="${char.name}" onerror="this.style.display='none'; this.nextSibling.style.display='flex'">`;
            } else if (isUnlocked) {
                avatarHtml = `<div class="character-list-avatar-placeholder">?</div>`;
            } else {
                avatarHtml = `<div class="character-list-avatar-placeholder">?</div>`;
            }
            
            card.innerHTML = `
                <div class="character-list-item">
                    ${avatarHtml}
                    <div class="character-list-info">
                        <div class="character-list-name">${isUnlocked ? char.name : '???'}</div>
                        <div class="character-list-desc">${isUnlocked ? char.shortDesc : 'ПЕРСОНАЖ ЗАКРЫТ'}</div>
                    </div>
                </div>
            `;
            
            if (isUnlocked) {
                card.onclick = () => this.showCharacterDetail(id, char);
                card.style.cursor = 'pointer';
            } else {
                card.style.opacity = '0.4';
            }
            
            container.appendChild(card);
        }
    }
    
    renderCharacterDetail(characterId, characterData) {
        const container = document.getElementById('characterDetail');
        if (!container) return;
        
        const isUnlocked = this.unlockedCharacters.includes(characterId);
        
        if (!isUnlocked) {
            container.innerHTML = `
                <div class="character-detail-locked">
                    <div class="character-detail-avatar">?</div>
                    <div class="character-detail-name">???</div>
                    <div class="character-detail-desc">Персонаж ещё не разблокирован</div>
                    <div class="character-detail-fact">Продолжайте расследование</div>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <div class="character-detail-unlocked">
                <img src="${characterData.avatar}" class="character-detail-avatar-img" alt="${characterData.name}" onerror="this.style.display='none'; this.nextSibling.style.display='flex'">
                <div style="display: none; width:300px; height:450px; background:var(--button-bg); border-radius:2px; align-items:center; justify-content:center; font-size:40px; margin-bottom:20px;">?</div>
                <div class="character-detail-name">${characterData.name}</div>
                <div class="character-detail-desc">${characterData.fullDesc}</div>
                <div class="character-detail-fact-title">ФАКТ</div>
                <div class="character-detail-fact">${characterData.fact}</div>
            </div>
        `;
    }
    
    saveUnlockedToState() {
        this.gameState.unlockedCharacters = [...this.unlockedCharacters];
    }
    
    unlockCharacterByScene(sceneId) {
        for (const [id, char] of Object.entries(CharactersData)) {
            if (char.unlockScene === sceneId && !this.unlockedCharacters.includes(id) && !char.isUnlockedByDefault) {
                this.unlockedCharacters.push(id);
                this.showUnlockNotification(char.name);
            }
        }
    }
    
    showUnlockNotification(characterName) {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.backgroundColor = 'var(--bg-container)';
        notification.style.color = 'var(--text-light)';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '2px';
        notification.style.fontWeight = 'normal';
        notification.style.zIndex = '3000';
        notification.style.border = '1px solid var(--border)';
        notification.style.fontFamily = 'Courier New, monospace';
        notification.innerText = `РАЗБЛОКИРОВАН: ${characterName}`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
    
    render() {
        const currentScene = this.sceneManager.getScene(this.gameState.currentScene);
        if (!currentScene) {
            this.resetGame();
            return;
        }
        
        this.unlockCharacterByScene(this.gameState.currentScene);
        
        const content = currentScene.getText(this.gameState);
        
        const profSpan = document.getElementById('profValue');
        const feelSpan = document.getElementById('feelValue');
        const trustSpan = document.getElementById('trustValue');
        
        if (profSpan) profSpan.innerText = this.gameState.professionalism;
        if (feelSpan) feelSpan.innerText = this.gameState.personalFeelings;
        if (trustSpan) trustSpan.innerText = this.gameState.internTrust;
        
        const storyDiv = document.getElementById('storyText');
        if (storyDiv) {
            storyDiv.innerHTML = content.text.replace(/\n/g, '<br>');
            storyDiv.scrollTop = 0;
        }
        
        const choicesDiv = document.getElementById('choicesList');
        if (!choicesDiv) return;
        choicesDiv.innerHTML = '';
        
        for (const choice of content.choices) {
            if (choice.isInput) {
                const container = document.createElement('div');
                container.className = 'input-area';
                const input = document.createElement('input');
                input.placeholder = choice.placeholder || 'ВВЕДИТЕ ОТВЕТ...';
                const btn = document.createElement('button');
                btn.innerText = 'ОТВЕТИТЬ';
                btn.onclick = () => {
                    const val = input.value.trim();
                    if (val) this.makeChoice(choice.id, val);
                };
                container.appendChild(input);
                container.appendChild(btn);
                choicesDiv.appendChild(container);
            } else {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = choice.text;
                btn.onclick = () => this.makeChoice(choice.id);
                choicesDiv.appendChild(btn);
            }
        }
    }
    
    makeChoice(choiceId, userInput = null) {
        const currentSceneObj = this.sceneManager.getScene(this.gameState.currentScene);
        if (!currentSceneObj) return;
        
        const content = currentSceneObj.getText(this.gameState);
        const choice = content.choices.find(c => c.id === choiceId);
        
        if (choice && choice.consequences) {
            this.gameState.updateStats(choice.consequences);
        }
        
        const nextSceneId = this.sceneManager.processChoice(
            this.gameState.currentScene, choiceId, this.gameState, userInput
        );
        
        if (nextSceneId === 'reset') {
            this.resetGame();
            return;
        }
        
        this.gameState.currentScene = nextSceneId;
        this.saveUnlockedToState();
        SaveService.save(this.gameState);
        this.render();
    }
    
    resetGame() {
        if (confirm('НАЧАТЬ ИГРУ ЗАНОВО? ВЕСЬ ПРОГРЕСС БУДЕТ ПОТЕРЯН.')) {
            this.gameState = new GameState();
            this.unlockedCharacters = [];
            for (const [id, char] of Object.entries(CharactersData)) {
                if (char.isUnlockedByDefault) {
                    this.unlockedCharacters.push(id);
                }
            }
            SaveService.deleteSave();
            this.showMainMenu();
        }
    }
    
    saveGame() {
        this.saveUnlockedToState();
        SaveService.save(this.gameState);
        alert('ИГРА СОХРАНЕНА');
    }
    
    toggleMusic() {
        if (this.music.paused) {
            this.music.play().catch(e => console.log('Play error:', e));
            this.musicPlaying = true;
            localStorage.setItem('music_muted', 'false');
            const toggleBtn = document.getElementById('toggleMusicBtn');
            if (toggleBtn) toggleBtn.innerText = 'M';
        } else {
            this.music.pause();
            this.musicPlaying = false;
            localStorage.setItem('music_muted', 'true');
            const toggleBtn = document.getElementById('toggleMusicBtn');
            if (toggleBtn) toggleBtn.innerText = 'M';
        }
    }
}

const game = new HemzitsipaGame();