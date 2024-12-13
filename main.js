/**
 * Advanced Canvas Toolkit v2.0
 * Created by Tadashi Jei (TadashiJei.com)
 * A powerful toolkit for academic research and canvas manipulation
 * 
 * Usage:
 * 1. Copy this entire script
 * 2. Open browser console (F12)
 * 3. Paste and press Enter
 * 4. Type startQuiz() to begin
 * 
 * Features:
 * - Advanced quiz automation
 * - Canvas manipulation
 * - Security measures
 * - Visual effects
 * 
 * For more tools and updates:
 * Visit: TadashiJei.com
 */

(function() {
    // Encryption utilities
    const CryptoUtils = {
        async encrypt(text, key) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hash = await crypto.subtle.digest('SHA-256', encoder.encode(key));
            const cryptoKey = await crypto.subtle.importKey(
                'raw', hash, { name: 'AES-GCM' }, false, ['encrypt']
            );
            const iv = crypto.getRandomValues(new Uint8Array(12));
            const encrypted = await crypto.subtle.encrypt(
                { name: 'AES-GCM', iv }, cryptoKey, data
            );
            return { encrypted, iv };
        },

        async decrypt(encrypted, key, iv) {
            const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key));
            const cryptoKey = await crypto.subtle.importKey(
                'raw', hash, { name: 'AES-GCM' }, false, ['decrypt']
            );
            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-GCM', iv }, cryptoKey, encrypted
            );
            return new TextDecoder().decode(decrypted);
        }
    };

    // Advanced Memory Protection
    const MemoryProtection = {
        variables: new Map(),
        
        store(key, value) {
            const encryptedKey = btoa(String(key));
            const encryptedValue = typeof value === 'object' ? 
                btoa(JSON.stringify(value)) : btoa(String(value));
            this.variables.set(encryptedKey, encryptedValue);
        },

        retrieve(key) {
            const encryptedKey = btoa(String(key));
            const value = this.variables.get(encryptedKey);
            if (!value) return null;
            try {
                const decrypted = atob(value);
                return JSON.parse(decrypted);
            } catch {
                return atob(value);
            }
        }
    };

    // VM Detection and Evasion
    const VMDetector = {
        checkVMSignatures() {
            const signatures = [
                'vmware',
                'virtualbox',
                'qemu',
                'xen',
                'parallels'
            ];
            
            const checks = [
                navigator.userAgent.toLowerCase(),
                navigator.hardwareConcurrency,
                screen.availWidth,
                screen.availHeight
            ];

            return !checks.some(check => 
                signatures.some(sig => String(check).includes(sig))
            );
        },

        evadeVM() {
            if (!this.checkVMSignatures()) {
                throw new Error('Unsupported environment');
            }
        }
    };

    // Advanced Browser Fingerprint Protection
    const FingerprintProtection = {
        originalFunctions: {},

        init() {
            this.protectCanvas();
            this.protectAudio();
            this.protectWebGL();
            this.protectFonts();
        },

        protectCanvas() {
            const original = HTMLCanvasElement.prototype.toDataURL;
            HTMLCanvasElement.prototype.toDataURL = function() {
                const ctx = this.getContext('2d');
                if (ctx) {
                    const imageData = ctx.getImageData(0, 0, this.width, this.height);
                    for (let i = 0; i < imageData.data.length; i += 4) {
                        imageData.data[i] += Math.random() * 0.01;
                    }
                    ctx.putImageData(imageData, 0, 0);
                }
                return original.apply(this, arguments);
            };
        },

        protectAudio() {
            if (window.AudioContext) {
                const original = window.AudioContext.prototype.createOscillator;
                window.AudioContext.prototype.createOscillator = function() {
                    const oscillator = original.apply(this, arguments);
                    const originalFrequency = oscillator.frequency.value;
                    oscillator.frequency.value = originalFrequency + Math.random() * 0.01;
                    return oscillator;
                };
            }
        },

        protectWebGL() {
            const original = WebGLRenderingContext.prototype.getParameter;
            WebGLRenderingContext.prototype.getParameter = function(parameter) {
                const result = original.apply(this, arguments);
                if (typeof result === 'string') {
                    return result.replace(/(vendor|renderer|version)/gi, '');
                }
                return result;
            };
        },

        protectFonts() {
            Object.defineProperty(document, 'fonts', {
                get: () => new Set(['Arial', 'Times New Roman', 'Courier New'])
            });
        }
    };

    // Advanced Network Protection
    const NetworkProtection = {
        originalXHR: window.XMLHttpRequest,
        originalFetch: window.fetch,

        init() {
            this.protectXHR();
            this.protectFetch();
            this.protectWebSocket();
        },

        protectXHR() {
            const self = this;
            window.XMLHttpRequest = function() {
                const xhr = new self.originalXHR();
                const original = xhr.send;
                xhr.send = function() {
                    xhr.setRequestHeader('X-Requested-With', self.generateRandomString());
                    return original.apply(xhr, arguments);
                };
                return xhr;
            };
        },

        protectFetch() {
            const self = this;
            window.fetch = function(url, options = {}) {
                options.headers = {
                    ...options.headers,
                    'X-Requested-With': self.generateRandomString()
                };
                return self.originalFetch.call(window, url, options);
            };
        },

        protectWebSocket() {
            const original = WebSocket;
            window.WebSocket = function(url, protocols) {
                const ws = new original(url, protocols);
                ws.addEventListener('open', () => {
                    ws.send(this.generateRandomString());
                });
                return ws;
            };
        },

        generateRandomString() {
            return btoa(crypto.getRandomValues(new Uint8Array(12)).toString());
        }
    };

    // ASCII Animation System
    const ASCIIAnimator = {
        skull: [
`
     .ed"""" """$$$$be.
   -"           ^""**$$$e.
 ."                   '$$$c
/                      "4$$b
d  3                     $$$$
$  *                   .$$$$$$
.$  ^c           $$$$$e$$$$$$$$.
d$L  4.         4$$$$$$$$$$$$$$b
$$$$b ^ceeeee.  4$$ECL.F*$$$$$$$
$$$$P d$$$$F $ $$$$$$$$$- $$$$$$
3$$$F "$$$$b   $"$$$$$$$  $$$$*"
 $$P"  "$$b   .$ $$$$$...e$$
  *c    ..    $$ 3$$$$$$$$$$eF
    %ce""    $$$  $$$$$$$$$$*
     *$e.    *** d$$$$$"L$$
      $$$      4J$$$$$% $$$
     $"'$=e....$*$$**$cz$$"
     $  *=%4.$ L L$ P3$$$F
     $   "%*ebJLzb$e$$$$$b
      %..      4$$$$$$$$$$
       $$$e   z$$$$$$$$$$
        "*$c  "$$$$$$$P"
          """*$$$$$$$"
`,
`
              ______
           .-"      "-.
          /            \\
         |              |
         |,  .-.  .-.  ,|
         | )(__/  \\__)( |
         |/     /\\     \\|
         (_     ^^     _)
          \\__|IIIIII|__/
           | \\IIIIII/ |
           \\          /
            \`--------\`
`,
`
                 uuuuuuu
             uu$$$$$$$$$$$uu
          uu$$$$$$$$$$$$$$$$$uu
         u$$$$$$$$$$$$$$$$$$$$$u
        u$$$$$$$$$$$$$$$$$$$$$$$u
       u$$$$$$$$$$$$$$$$$$$$$$$$$u
       u$$$$$$$$$$$$$$$$$$$$$$$$$u
       u$$$$$$"   "$$$"   "$$$$$$u
       "$$$$"      u$u       $$$$"
        $$$u       u$u       u$$$
        $$$u      u$$$u      u$$$
         "$$$$uu$$$   $$$uu$$$$"
          "$$$$$$$"   "$$$$$$$"
            u$$$$$$$u$$$$$$$u
             u$"$"$"$"$"$"$u
`
        ],

        rat: `
        __             _,-"~^"-.
       _// )      _,-"~\`         \`.
     ." ( /\`"-,-"\`                 ;
    / 6                             ;
   /           ,             ,-"     ;
  (,__.--.      \\           /        ;
   //'   /\`--.   |          |        \`._________
     _.-'_/   )  |          \\_,         \\`--..__\`\`--.
   \`"(((\`\`   (((\`\`            \`\`---\`\`\`\`\`\`\`\`\`\`
`,

        currentFrame: 0,
        animationInterval: null,

        startSkullAnimation() {
            let frame = 0;
            console.clear();
            this.animationInterval = setInterval(() => {
                console.clear();
                console.log('%c' + this.skull[frame], 'color: #ff0000; font-family: monospace');
                frame = (frame + 1) % this.skull.length;
            }, 500);
        },

        createRatElement() {
            const rat = document.createElement('pre');
            rat.style.cssText = `
                position: fixed;
                font-family: monospace;
                white-space: pre;
                color: #00ff00;
                text-shadow: 0 0 5px #00ff00;
                pointer-events: none;
                z-index: 999999;
                font-size: 12px;
            `;
            rat.textContent = this.rat;
            document.body.appendChild(rat);
            return rat;
        },

        animateRat() {
            const rat = this.createRatElement();
            let x = -300;
            let y = Math.random() * (window.innerHeight - 100);
            let dx = 5;
            let dy = 2;

            const animate = () => {
                x += dx;
                y += dy;

                if (x > window.innerWidth) {
                    x = -300;
                    y = Math.random() * (window.innerHeight - 100);
                }

                if (y < 0 || y > window.innerHeight - 100) {
                    dy = -dy;
                }

                rat.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(animate);
            };

            animate();
        },

        stopAnimations() {
            clearInterval(this.animationInterval);
        }
    };

    // Rat Animation
    const ratAnimation = {
        init() {
            const rat = document.createElement('div');
            rat.style.cssText = `
                position: fixed;
                font-family: monospace;
                white-space: pre;
                color: #0f0;
                text-shadow: 0 0 5px #0f0;
                pointer-events: none;
                z-index: 999999;
                font-size: 12px;
            `;
            rat.textContent = `
        __             _,-"~^"-.
       _// )      _,-"~\`         \`.
     ." ( /\`"-,-"\`                 ;
    / 6                             ;
   /           ,             ,-"     ;
  (,__.--.      \\           /        ;
   //'   /\`--.   |          |        \`._________
     _.-'_/   )  |          \\_,         \\`--..__\`\`--.
   \`"(((\`\`   (((\`\`            \`\`---\`\`\`\`\`\`\`\`\`\`
`;
            
            document.body.appendChild(rat);
            
            let x = -300;
            let y = Math.random() * (window.innerHeight - 100);
            
            const animate = () => {
                x += 5;
                if (x > window.innerWidth) {
                    x = -300;
                    y = Math.random() * (window.innerHeight - 100);
                }
                rat.style.transform = `translate(${x}px, ${y}px)`;
                requestAnimationFrame(animate);
            };
            
            animate();
        }
    };

    // Matrix Rain Effect
    const MatrixRain = {
        init() {
            const canvas = document.createElement('canvas');
            canvas.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 999998;
                pointer-events: none;
                opacity: 0.3;
            `;
            document.body.appendChild(canvas);

            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const columns = Math.floor(canvas.width / 20);
            const drops = new Array(columns).fill(0);

            function draw() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0F0';
                ctx.font = '15px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = String.fromCharCode(0x30A0 + Math.random() * 33);
                    ctx.fillText(text, i * 20, drops[i] * 20);

                    if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                        drops[i] = 0;
                    }
                    drops[i] += 1;
                }
            }

            setInterval(draw, 33);
        }
    };

    // Glitch Effect
    const GlitchEffect = {
        init() {
            const style = document.createElement('style');
            style.textContent = `
                @keyframes glitch {
                    0% { transform: translate(0) }
                    20% { transform: translate(-2px, 2px) }
                    40% { transform: translate(-2px, -2px) }
                    60% { transform: translate(2px, 2px) }
                    80% { transform: translate(2px, -2px) }
                    100% { transform: translate(0) }
                }
                .glitch {
                    animation: glitch 0.3s infinite;
                    animation-timing-function: steps(1);
                }
            `;
            document.head.appendChild(style);
        },

        applyToElement(element) {
            element.classList.add('glitch');
        }
    };

    class CanvasToolkit {
        constructor(config = {}) {
            this.initializeProtections();
            this.setupEncryption();
            this.apiKey = this.secureStore(config.apiKey || prompt('Enter your Gemini API key:'));
            this.GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
            this.securityToken = this.generateSecurityToken();
            this.isEnabled = false;
            this.originalCanvas = this._backupCanvasMethods();
            this.initSecurity();
            this.setupAdvancedProtections();
            this.initVisualEffects();
        }

        // Initialize all protections
        initializeProtections() {
            VMDetector.evadeVM();
            FingerprintProtection.init();
            NetworkProtection.init();
        }

        // Setup encryption
        async setupEncryption() {
            this.encryptionKey = await crypto.subtle.generateKey(
                { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']
            );
        }

        // Secure storage
        secureStore(value) {
            return MemoryProtection.store('apiKey', value);
        }

        // Generate secure token
        generateSecurityToken() {
            const token = crypto.getRandomValues(new Uint8Array(32));
            return btoa(String.fromCharCode.apply(null, token));
        }

        // Setup advanced protections
        setupAdvancedProtections() {
            this.setupMemoryProtection();
            this.setupCodeProtection();
            this.setupBehaviorAnalysis();
        }

        // Memory protection
        setupMemoryProtection() {
            Object.defineProperty(window, 'canvasToolkit', {
                get: () => this.proxyHandler(this),
                set: () => {
                    throw new Error('Access denied');
                }
            });
        }

        // Code protection
        setupCodeProtection() {
            const code = this.toString();
            Object.defineProperty(this, 'toString', {
                value: () => '[object Object]',
                writable: false,
                configurable: false
            });
        }

        // Behavior analysis
        setupBehaviorAnalysis() {
            let suspiciousActions = 0;
            const maxSuspiciousActions = 3;

            return new Proxy(this, {
                get: (target, prop) => {
                    if (this.isActionSuspicious()) {
                        suspiciousActions++;
                        if (suspiciousActions >= maxSuspiciousActions) {
                            this.handleSuspiciousActivity();
                        }
                    }
                    return target[prop];
                }
            });
        }

        // Check for suspicious actions
        isActionSuspicious() {
            return (
                this.checkTimeManipulation() ||
                this.checkMouseMovement() ||
                this.checkKeyboardEvents()
            );
        }

        // Time manipulation check
        checkTimeManipulation() {
            const start = Date.now();
            for (let i = 0; i < 1000; i++) {}
            return (Date.now() - start) < 1;
        }

        // Mouse movement check
        checkMouseMovement() {
            const movements = [];
            document.addEventListener('mousemove', (e) => {
                movements.push([e.clientX, e.clientY]);
                if (movements.length > 10) {
                    const isRobot = this.analyzeMousePattern(movements);
                    if (isRobot) return true;
                }
            });
            return false;
        }

        // Analyze mouse patterns
        analyzeMousePattern(movements) {
            let perfectLines = 0;
            for (let i = 2; i < movements.length; i++) {
                const [x1, y1] = movements[i-2];
                const [x2, y2] = movements[i-1];
                const [x3, y3] = movements[i];
                
                const slope1 = (y2 - y1) / (x2 - x1);
                const slope2 = (y3 - y2) / (x3 - x2);
                
                if (Math.abs(slope1 - slope2) < 0.0001) {
                    perfectLines++;
                }
            }
            return perfectLines > 5;
        }

        // Keyboard event check
        checkKeyboardEvents() {
            const keyTimes = [];
            document.addEventListener('keydown', (e) => {
                keyTimes.push(Date.now());
                if (keyTimes.length > 10) {
                    const isRobot = this.analyzeKeyboardPattern(keyTimes);
                    if (isRobot) return true;
                }
            });
            return false;
        }

        // Analyze keyboard patterns
        analyzeKeyboardPattern(times) {
            const intervals = [];
            for (let i = 1; i < times.length; i++) {
                intervals.push(times[i] - times[i-1]);
            }
            
            const avgInterval = intervals.reduce((a, b) => a + b) / intervals.length;
            const perfectTiming = intervals.filter(i => Math.abs(i - avgInterval) < 10).length;
            
            return perfectTiming > intervals.length * 0.8;
        }

        // Initialize security measures
        initSecurity() {
            this._hookConsole();
            this._hookDebugger();
            this._hookDevTools();
            this._injectAntiDetection();
            return new Proxy(this, this._createSecurityProxy());
        }

        // Backup original canvas methods
        _backupCanvasMethods() {
            return {
                getContext: HTMLCanvasElement.prototype.getContext,
                toDataURL: HTMLCanvasElement.prototype.toDataURL,
                requestAnimationFrame: window.requestAnimationFrame,
                Date: window.Date
            };
        }

        // Create security proxy
        _createSecurityProxy() {
            return {
                get: (target, prop) => {
                    if (typeof target[prop] === 'function') {
                        return (...args) => {
                            const start = performance.now();
                            const result = target[prop].apply(target, args);
                            
                            if (result instanceof Promise) {
                                return result.then(value => {
                                    this._checkTiming(start);
                                    return value;
                                });
                            }
                            
                            this._checkTiming(start);
                            return result;
                        };
                    }
                    return target[prop];
                }
            };
        }

        // Check for suspicious timing patterns
        _checkTiming(start) {
            const executionTime = performance.now() - start;
            if (executionTime < 10) {
                this._handleSuspiciousActivity('Suspicious timing detected');
            }
        }

        // Anti-detection measures
        _injectAntiDetection() {
            // Override property getters to prevent fingerprinting
            Object.defineProperties(navigator, {
                webdriver: { get: () => false },
                languages: { get: () => ['en-US', 'en'] },
                plugins: { get: () => [] },
                hardwareConcurrency: { get: () => 8 }
            });

            // Randomize canvas fingerprint
            HTMLCanvasElement.prototype.toDataURL = function() {
                const ctx = this.getContext('2d');
                const noise = Math.random() * 0.01;
                const imageData = ctx.getImageData(0, 0, this.width, this.height);
                for (let i = 0; i < imageData.data.length; i += 4) {
                    imageData.data[i] += noise;
                }
                ctx.putImageData(imageData, 0, 0);
                return this.originalCanvas.toDataURL.apply(this, arguments);
            };
        }

        // Hook console methods
        _hookConsole() {
            const originalConsole = { ...console };
            Object.keys(originalConsole).forEach(key => {
                if (typeof originalConsole[key] === 'function') {
                    console[key] = (...args) => {
                        if (!args.some(arg => String(arg).includes('automation') || String(arg).includes('selenium'))) {
                            originalConsole[key].apply(console, args);
                        }
                    };
                }
            });
        }

        // Hook debugger
        _hookDebugger() {
            setInterval(() => {
                const start = performance.now();
                debugger;
                const end = performance.now();
                if (end - start > 100) {
                    this._handleSuspiciousActivity('Debugger detected');
                }
            }, 1000);
        }

        // Hook DevTools
        _hookDevTools() {
            const element = new Image();
            Object.defineProperty(element, 'id', {
                get: () => {
                    this._handleSuspiciousActivity('DevTools detected');
                }
            });
            console.debug(element);
        }

        // Handle suspicious activity
        _handleSuspiciousActivity(reason) {
            console.warn(`[Security Alert] ${reason}`);
            this._addRandomDelay();
        }

        // Add random delay to simulate human behavior
        _addRandomDelay() {
            const delay = 1000 + Math.random() * 2000;
            return new Promise(resolve => setTimeout(resolve, delay));
        }

        // Quiz Automation Methods
        async automateQuiz() {
            try {
                const questions = await this._scanQuizPage();
                for (const question of questions) {
                    await this._processQuestion(question);
                    await this._addRandomDelay();
                }
            } catch (error) {
                console.error('Quiz automation error:', error);
            }
        }

        // Scan quiz page for questions
        async _scanQuizPage() {
            const questions = [];
            const questionElements = document.querySelectorAll('.question_text, .quiz_question');
            
            for (const element of questionElements) {
                const questionData = this._extractQuestionData(element);
                if (questionData) {
                    questions.push(questionData);
                }
            }
            
            return questions;
        }

        // Extract question data
        _extractQuestionData(element) {
            const questionContainer = element.closest('.question, .quiz_question');
            if (!questionContainer) return null;

            return {
                id: questionContainer.id,
                text: element.textContent.trim(),
                type: this._determineQuestionType(questionContainer),
                options: this._extractOptions(questionContainer)
            };
        }

        // Determine question type
        _determineQuestionType(container) {
            if (container.querySelector('input[type="radio"]')) return 'multiple_choice';
            if (container.querySelector('input[type="checkbox"]')) return 'multiple_answer';
            if (container.querySelector('textarea')) return 'essay';
            if (container.querySelector('input[type="text"]')) return 'short_answer';
            return 'unknown';
        }

        // Extract answer options
        _extractOptions(container) {
            const options = [];
            const optionElements = container.querySelectorAll('.answer, .answer_text');
            
            optionElements.forEach((element, index) => {
                const input = element.querySelector('input[type="radio"], input[type="checkbox"]');
                if (input) {
                    options.push({
                        index,
                        text: element.textContent.trim(),
                        element: input
                    });
                }
            });
            
            return options;
        }

        // Process individual question
        async _processQuestion(question) {
            try {
                const answer = await this._getAnswer(question);
                await this._fillAnswer(question, answer);
            } catch (error) {
                console.error(`Error processing question ${question.id}:`, error);
            }
        }

        // Get answer from Gemini API
        async _getAnswer(question) {
            // Show visual feedback when processing
            const questionElement = document.getElementById(question.id);
            if (questionElement) {
                questionElement.style.textShadow = '0 0 10px #00ff00';
                setTimeout(() => {
                    questionElement.style.textShadow = 'none';
                }, 1000);
            }

            const encryptedPrompt = await CryptoUtils.encrypt(
                this._formatPrompt(question),
                this.securityToken
            );
            
            try {
                const response = await this._secureApiCall(encryptedPrompt);
                return this._parseGeminiResponse(response, question);
            } catch (error) {
                console.error('API error:', error);
                throw error;
            }
        }

        // Secure API call
        async _secureApiCall(encryptedData) {
            const headers = {
                'Content-Type': 'application/json',
                'X-Security-Token': this.securityToken,
                'X-Client-Version': '2.0',
                'X-Request-Time': Date.now()
            };

            const response = await fetch(`${this.GEMINI_API_URL}?key=${this.apiKey}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: encryptedData }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API call failed: ${response.status}`);
            }

            return response.json();
        }

        // Format prompt for Gemini
        _formatPrompt(question) {
            let prompt = `Question: ${question.text}\n\n`;
            
            if (question.options.length > 0) {
                prompt += 'Options:\n';
                question.options.forEach((option, index) => {
                    prompt += `${index + 1}. ${option.text}\n`;
                });
            }

            prompt += '\nProvide the best answer based on the question type. ';
            prompt += 'For multiple choice, specify the number. For text answers, provide a concise response.';
            
            return prompt;
        }

        // Parse Gemini API response
        _parseGeminiResponse(response, question) {
            try {
                const answer = response.candidates[0].content.parts[0].text;
                
                if (question.type === 'multiple_choice' || question.type === 'multiple_answer') {
                    const numberMatch = answer.match(/\d+/);
                    return numberMatch ? parseInt(numberMatch[0]) - 1 : null;
                }
                
                return answer;
            } catch (error) {
                console.error('Error parsing Gemini response:', error);
                return null;
            }
        }

        // Fill in the answer
        async _fillAnswer(question, answer) {
            if (answer === null) return;

            switch (question.type) {
                case 'multiple_choice':
                case 'multiple_answer':
                    if (typeof answer === 'number' && question.options[answer]) {
                        await this._simulateHumanClick(question.options[answer].element);
                    }
                    break;

                case 'essay':
                case 'short_answer':
                    const input = document.querySelector(`#${question.id} textarea, #${question.id} input[type="text"]`);
                    if (input) {
                        await this._simulateHumanTyping(input, answer);
                    }
                    break;
            }
        }

        // Simulate human clicking
        async _simulateHumanClick(element) {
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            // Mouse move
            const moveEvent = new MouseEvent('mousemove', {
                bubbles: true,
                clientX: x,
                clientY: y
            });
            element.dispatchEvent(moveEvent);

            await this._addRandomDelay();

            // Mouse down
            const downEvent = new MouseEvent('mousedown', {
                bubbles: true,
                clientX: x,
                clientY: y
            });
            element.dispatchEvent(downEvent);

            await this._addRandomDelay();

            // Mouse up and click
            const upEvent = new MouseEvent('mouseup', {
                bubbles: true,
                clientX: x,
                clientY: y
            });
            element.dispatchEvent(upEvent);
            element.click();
        }

        // Simulate human typing
        async _simulateHumanTyping(element, text) {
            if (!element) return;

            element.focus();
            
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                element.value += char;
                
                // Dispatch events
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new KeyboardEvent('keydown', { key: char }));
                element.dispatchEvent(new KeyboardEvent('keypress', { key: char }));
                element.dispatchEvent(new KeyboardEvent('keyup', { key: char }));
                
                // Random typing delay
                await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 150));
            }

            element.dispatchEvent(new Event('change', { bubbles: true }));
        }

        // Initialize visual effects
        initVisualEffects() {
            ASCIIAnimator.startSkullAnimation();
            ratAnimation.init();
            MatrixRain.init();
            GlitchEffect.init();

            // Apply glitch effect to quiz elements
            document.querySelectorAll('.question, .answer').forEach(element => {
                GlitchEffect.applyToElement(element);
            });
        }
    }

    // Create global instance with enhanced security and visual effects
    const toolkit = new CanvasToolkit();
    Object.freeze(toolkit);
    
    // Enhanced startup command with visual effects
    window.startQuiz = async () => {
        if (!toolkit.isEnabled) {
            console.log('%cInitializing Toolkit...', 'color: #00ff00; font-size: 20px; font-weight: bold;');
            console.log('%cHacking the mainframe...', 'color: #00ff00; font-size: 16px;');
            
            try {
                await toolkit.automateQuiz();
            } catch (error) {
                console.error('%cAutomation failed:', 'color: #ff0000; font-size: 16px;', error);
            }
        }
    };

    console.log(`%c
    ████████╗ █████╗ ██████╗  █████╗ ███████╗██╗  ██╗██╗     ██╗███████╗██╗
    ╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║██║     ██║██╔════╝██║
       ██║   ███████║██║  ██║███████║███████╗███████║██║     ██║█████╗  ██║
       ██║   ██╔══██║██║  ██║██╔══██║╚════██║██╔══██║██║     ██║██╔══╝  ██║
       ██║   ██║  ██║██████╔╝██║  ██║███████║██║  ██║███████╗██║███████╗██║
       ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚══════╝╚═╝╚══════╝╚═╝
    `, 'color: #00ff00; font-family: monospace;');

    console.log(`%c
    ▄▄▄█████▓ ▒█████   ▒█████   ██▓     ██ ▄█▀ ██▓▄▄▄█████▓
    ▓  ██▒ ▓▒▒██▒  ██▒▒██▒  ██▒▓██▒     ██▄█▒ ▓██▒▓  ██▒ ▓▒
    ▒ ▓██░ ▒░▒██░  ██▒▒██░  ██▒▒██░    ▓███▄░ ▒██▒▒ ▓██░ ▒░
    ░ ▓██▓ ░ ▒██   ██░▒██   ██░▒██░    ▓██ █▄ ░██░░ ▓██▓ ░ 
      ▒██▒ ░ ░ ████▓▒░░ ████▓▒░░██████▒▒██▒ █▄░██░  ▒██▒ ░ 
      ▒ ░░   ░ ▒░▒░▒░ ░ ▒░▒░▒░ ░ ▒░▓  ░▒ ▒▒ ▓▒░▓    ▒ ░░   
        ░      ░ ▒ ▒░   ░ ▒ ▒░ ░ ░ ▒  ░░ ░▒ ▒░ ▒ ░    ░    
      ░      ░ ░ ░ ▒  ░ ░ ░ ▒    ░ ░   ░ ░░ ░  ▒ ░  ░      
                ░ ░      ░ ░      ░  ░░  ░    ░         
    `, 'color: #00ff00; font-family: monospace;');
    
    console.log('%cEnhanced Canvas Toolkit v2.0', 'color: #00ff00; font-weight: bold; font-size: 20px;');
    console.log('%cCreated by Tadashi Jei (TadashiJei.com)', 'color: #00ff00; font-size: 16px;');
    console.log('%c───────────────────────────────────────────', 'color: #00ff00;');
    console.log('%cInjection Guide:', 'color: #00ff00; font-weight: bold;');
    console.log('%c1. Copy the entire script', 'color: #00ff00;');
    console.log('%c2. Open browser console (F12)', 'color: #00ff00;');
    console.log('%c3. Paste and press Enter', 'color: #00ff00;');
    console.log('%c4. Type startQuiz() to begin', 'color: #00ff00;');
    console.log('%c───────────────────────────────────────────', 'color: #00ff00;');
    console.log('%cFor more tools and updates, visit: TadashiJei.com', 'color: #00ff00; font-style: italic;');
    console.log('%cType startQuiz() to begin automation', 'color: #00ff00; font-weight: bold; font-size: 16px;');

})();
